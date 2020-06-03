import React, { useState } from 'react';
import useDimensions from './../../Hooks/UseDimensions'
import{ scaleLinear } from 'd3-scale'
import './Boxplot.scss';

// Components
import Axis from './../Axis'
const Boxplot = ({
	min,
	max,
	median,
	q1,
	q3,
	orientation,
	axis,
	h,
	col
}) => {
	
	//get dims, configured from props
	const [ref, {width, height}] = useDimensions();
	const inheritedPadding = 8;
	const chartPadding = 16;
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
		xScale = scaleLinear().domain([min,max]).range([chartPadding, chartWidth ])
		yScale = scaleLinear().domain([0, 100]).range([chartHeight, chartPadding])
	}

	/* 
		axis 
	*/
	let thisAxis = null
	if(orientation && orientation === 'horizontal'){
		thisAxis = <Axis 
			orient={"Bottom"}
			scale={xScale}
			translate={`translate(0,${height - (chartPadding * 2 )})`}
			width={width}
		/>
	}

	/*
		Min-to-max line props
	*/
	let minToMaxLineProps = {}
	if(xScale && yScale){
		
		minToMaxLineProps = {
			x1: xScale(min),
			x2: xScale(max),
			y1: (height - chartPadding) / 2,
			y2: (height - chartPadding) / 2,
			className: 'plain-text',
			stroke: whiteStroke
		}	
	}

	/*
		Box Props
	*/ 
	let boxHeight = (height - chartPadding) / 4
	let boxProps = {}
	if(xScale && yScale){

		//scaled qs
		let scaledQ3 = xScale(q3)
		let scaledQ1 = xScale(q1)
		let scaledW = scaledQ3 - scaledQ1
		
		let centerHeight = height / 2
		boxProps = {
			height: boxHeight,
			stroke: whiteStroke,
			// fill: boxFill,
			width: scaledW,
			x: scaledQ1,
			y: centerHeight - (boxHeight / 2) - (chartPadding / 2),
			className: 'boxplot-box'
		}
	}

	/*
			Min / Median / Max lines
	*/ 
	let threeLines = null;
	if(width && height){
		threeLines = [min,median, max].map((itm, idx) => {
			let scaledX = xScale(itm)
			let centerY = height / 2
			let lineTop = centerY - (boxHeight / 2) - (chartPadding / 2)
			let lineBottom = centerY + (boxHeight / 2) - (chartPadding / 2)

			return (
				<line
					key={`${idx}-minmaxline`}
					x1={scaledX}
					x2={scaledX}
					y1={lineTop}
					y2={lineBottom}
					stroke={whiteStroke}
				/>)
		})
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
								Boxplot
							</text>

							{axis && thisAxis}

							{/* min-to-max line */}
							{<line {...minToMaxLineProps}></line>}

							{/* box */}
							{<rect {...boxProps}></rect>}

						{/*min/median/max lines*/}
						{threeLines}
						</g>
					</svg>
				}
		</figure>
	)
};

export default Boxplot;
