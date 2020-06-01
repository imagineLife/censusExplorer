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


	/*
		SVG Dimensions
	*/
	let twoPads;
	let wLP;
	let hLP;

	if(width && height){
		twoPads = inheritedPadding * 2
		wLP = width - twoPads
		hLP = height - twoPads
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
	let xScale = () => {}
	let yScale = () => {}
	if(width && height){
		xScale = scaleLinear().domain([min,max]).range([inheritedPadding, wLP])
		yScale = scaleLinear().domain([0, 100]).range([hLP, inheritedPadding])
	}

	/* axis */
	let thisAxis = null
	if(orientation && orientation === 'horizontal'){
		thisAxis = <Axis 
			orient={"Bottom"}
			scale={xScale}
		/>
	}

	return(
		<figure {...figProps}>
				{/* wait till useDimension finishes */}
				{width && height && 
					<svg {...svgProps}>
						<text 
							className="plain-text"
							transform={`translate(${inheritedPadding},${inheritedPadding})`}
							alignmentBaseline="hanging">
							Boxplot
						</text>
						{axis && thisAxis}
					</svg>
				}
		</figure>
	)
};

export default Boxplot;
