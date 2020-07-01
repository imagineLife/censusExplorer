import React, { useState } from 'react';
import useDimensions from './../../Hooks/UseDimensions'
import { stateAbbr } from './../../helpers'
import { scaleBand, scaleLinear } from 'd3-scale'
import './Lollipop.scss';
import * as arr from 'd3-array';
// Components
import Axis from './../Axis'
const Lollipop = ({
	axis,
	col,
	data,
	h,
	orientation,
	ticks,
	title
}) => {
	
	//get dims, configured from props
	const [ref, {width, height}] = useDimensions();
	const inheritedPadding = 8;
	const chartPadding = 20;
	const whiteStroke = '#a9b7c9'
	const boxFill = 'rgb(38,49,20)'


	/*
		SVG && Chart 'inner' Dimensions
	*/
	let twoPads;
	let wLP, hLP;
	let chartWidth, chartHeight;

	if(width && height){
		//padding
		twoPads = inheritedPadding * 2
		let chartDoublePad = chartPadding * 2;
		
		//svg dims without padding
		wLP = width - twoPads
		hLP = height - twoPads
		
		//chart dims with MORE padding
		chartWidth = width - chartDoublePad;
		chartHeight = height - chartDoublePad;

	}

	/*
		SVG Props
	*/
	let svgProps = {}
	if(width && height){
		svgProps = {
			className:"chart-svg",
			width: width,
			height: height,
			transform: `translate(-${inheritedPadding}, -${inheritedPadding})`
		}
	}

	/*
		Figure Props
	*/ 
	const figProps = {
		className:`boxplot widget ${col}`,
		style: {height: h},
		ref
	}

	/*
		Scales
	*/	
	let xScale = null
	let yScale = null;
	
	if(width && height){
		//scales DO NOT account for transf/trans of elements
		//D3 Scales
		let yExtent = arr.extent(data, d => d.y)
		let maxY = yExtent[1] * 1.25
		
	xScale = scaleBand()
		.domain(data.map(d => stateAbbr(d.x)))
		.range([chartPadding * 1.1, chartWidth])
		.paddingInner(0)
		.paddingOuter(.1)
		yScale = scaleLinear()
			.domain([0,maxY])
			.range([chartHeight, chartPadding])
	}

	/* 
		axis 
	*/
	let xAxis = null, yAxis = null;
	if(orientation && orientation === 'vertical'){
		xAxis = <Axis 
			orient={"Bottom"}
			scale={xScale}
			translate={`translate(0,${height - (chartPadding * 2 )})`}
			width={width}
		/>

		yAxis = <Axis 
			orient={"Left"}
			scale={yScale}
			translate={`translate(${chartPadding},0)`}
			ticks={ticks}
			// width={width}
		/>
	}


	/*
		Rectangles
	*/ 
	let pops = null;
	if(xScale && yScale && hLP){
		pops = data.map((d,idx) => (
			<g className='lollipop' key={`pop-${d.x}-${idx}`}>
			<line
				// width={xScale.bandwidth()}
				className={`bar-rectangle ${d.x}`}
				x1={xScale(stateAbbr(d.x)) + (xScale.bandwidth() / 2)}
				x2={xScale(stateAbbr(d.x)) + (xScale.bandwidth() / 2)}
				y1={yScale(d.y)}
				y2={hLP - (chartPadding * 1.15)}
				stroke={"white"}
				strokeDasharray={'10 5'}
			/>
			<circle 
				cx={xScale(stateAbbr(d.x)) + (xScale.bandwidth() / 2)}
				cy={yScale(d.y)}
				r={5}
				className="pop-circle"
			/>
			</g>
		))
	}

	return(
		<figure {...figProps}>
				{/* wait till useDimension finishes */}
				{width && height && 
					<svg {...svgProps}>
						<g transform={`translate(${inheritedPadding},${inheritedPadding})`}>
							<text 
								className="plain-text"
								alignmentBaseline="hanging">
								{title}
							</text>

							{axis && yAxis}

							{pops && pops}

							{axis && xAxis}
						</g>
					</svg>
				}
		</figure>
	)
};

export default Lollipop;
