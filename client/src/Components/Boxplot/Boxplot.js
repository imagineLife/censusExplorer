import React, { useState } from 'react';
import useDimensions from './../../Hooks/UseDimensions'
import{ scaleLinear } from 'd3-scale'

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
		/>
	}

	let minToMaxLineProps = {}
	if(xScale && yScale){
		
		minToMaxLineProps = {
			x1: xScale(min),
			x2: xScale(max),
			y1: (height - chartPadding) / 2,
			y2: (height - chartPadding) / 2,
			className: 'plain-text',
			stroke: '#a9b7c9'
		}	
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
						</g>
					</svg>
				}
		</figure>
	)
};

export default Boxplot;
