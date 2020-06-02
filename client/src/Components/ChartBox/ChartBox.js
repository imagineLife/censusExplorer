import React, { useState } from 'react';
import useDimensions from './../../Hooks/UseDimensions'

const ChartBox = ({
	col,
	h,
	children,
	condition
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
	console.log('figProps')
	console.log(figProps)
	

	return(
		<figure {...figProps}>
				{/* wait till useDimension finishes */}
				{width && height && condition &&
					<svg {...svgProps}>
						<g transform={`translate(${inheritedPadding},${inheritedPadding})`}>
							{children && children}
						</g>
					</svg>
				}
		</figure>
	)
};

export default ChartBox;
