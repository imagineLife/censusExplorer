import React, { useState } from 'react';
import useDimensions from './../../Hooks/UseDimensions'
import { scaleBand, scaleLinear } from 'd3-scale'
import './BarChart.scss';

// Components
import Axis from './../Axis'
const BarChart = ({
	axis,
	col,
	data,
	h,
	orientation,
	ticks,
	yDomain
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
	let yScale = null
	if(width && height){
		//scales DO NOT account for transf/trans of elements
		//D3 Scales
	xScale = scaleBand()
		.domain(data.map(d => d.x))
		.range([chartPadding * 1.1, chartWidth])
		.paddingInner(0)
		.paddingOuter(.1)
		yScale = scaleLinear()
			.domain(yDomain)
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
	let rects = null;
	if(xScale && yScale && hLP){
		rects = data.map((d,idx) => (
			<rect 
				key={`rect-${d.x}-${idx}`}
				width={xScale.bandwidth()}
				className={`bar-rectangle ${d.x}`}
				x={xScale(d.x)}
				y={yScale(d.y)}
				height={hLP - (chartPadding * 1.15) - yScale(d.y)}
			/>
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
								Binned Ranges
							</text>

							{axis && yAxis}

							{rects && rects}

							{axis && xAxis}
						</g>
					</svg>
				}
		</figure>
	)
};

export default BarChart;
