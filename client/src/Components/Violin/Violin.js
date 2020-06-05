import React, { useState } from 'react';
import useDimensions from './../../Hooks/UseDimensions'
import{ scaleLinear, scaleBand } from 'd3-scale'
import * as arr from 'd3-array';
import { area } from 'd3-shape';
import { nest } from 'd3-collection'
import './Violin.scss';


// Components
import Axis from './../Axis'
const Violin = ({
	min,
	max,
	median,
	q1,
	q3,
	orientation,
	axis,
	h,
	col,
	data
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
		xScale = scaleLinear()
			.domain([min,max])
			.range([chartPadding, chartWidth ])
		yScale = scaleBand()
			.domain(["Statistic"])
			.range([chartHeight, chartPadding])
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
		histogram prep
	*/
	let hist = null, 
		sumstat = null, 
		maxNum = 0, 
		xNum = null,
		areaPath = null;
	if(xScale && yScale){
		hist = arr.histogram()
		.domain(xScale.domain())

		/*
			how many bins approx are going to be made? 
			...the 'resolution' of the violin plot
		*/
		// .thresholds(yScale.ticks(20))
		.value(d => d)

		/*
		compute "binning" for each data-element
		*/
		sumstat = nest()  // nest function allows to group the calculation per level of a factor   
			.key(d => "Stat")
	    .rollup(function(d) {   // For each key..
	      let input = d.map(function(g) { return g.x;})    // Keep the variable called Sepal_Length
	      let bins = hist(input)   // And compute the binning on it.
	      return(bins)
	    })
	    .entries(data)

	  
	  // What is the biggest number of value in a bin? We need it cause this value will have a width of 100% of the bandwidth.
    let allBins = sumstat[0].value
    let lengths = allBins.map(d => d.length)
    
    let longest = arr.max(lengths)
    if (longest > maxNum) { maxNum = longest }
    
    xNum = scaleLinear()
    .range([0, yScale.bandwidth()])
    .domain([-maxNum,maxNum])

	}


	/*
		Min-to-max line props
	*/
	// let minToMaxLineProps = {}
	// if(xScale && yScale){
		
	// 	minToMaxLineProps = {
	// 		x1: xScale(min),
	// 		x2: xScale(max),
	// 		y1: (height - chartPadding) / 2,
	// 		y2: (height - chartPadding) / 2,
	// 		className: 'plain-text',
	// 		stroke: whiteStroke
	// 	}	
	// }

	// /*
	// 	Box Props
	// */ 
	// let boxHeight = (height - chartPadding) / 4
	// let boxProps = {}
	// if(xScale && yScale){

	// 	//scaled qs
	// 	let scaledQ3 = xScale(q3)
	// 	let scaledQ1 = xScale(q1)
	// 	let scaledW = scaledQ3 - scaledQ1
		
	// 	let centerHeight = height / 2
	// 	boxProps = {
	// 		height: boxHeight,
	// 		stroke: whiteStroke,
	// 		// fill: boxFill,
	// 		width: scaledW,
	// 		x: scaledQ1,
	// 		y: centerHeight - (boxHeight / 2) - (chartPadding / 2),
	// 		className: 'boxplot-box'
	// 	}
	// }

	// /*
	// 		Min / Median / Max lines
	// */ 
	// let threeLines = null;
	// if(width && height){
	// 	threeLines = [min,median, max].map((itm, idx) => {
	// 		let scaledX = xScale(itm)
	// 		let centerY = height / 2
	// 		let lineTop = centerY - (boxHeight / 2) - (chartPadding / 2)
	// 		let lineBottom = centerY + (boxHeight / 2) - (chartPadding / 2)

	// 		return (
	// 			<line
	// 				key={`${idx}-minmaxline`}
	// 				x1={scaledX}
	// 				x2={scaledX}
	// 				y1={lineTop}
	// 				y2={lineBottom}
	// 				stroke={whiteStroke}
	// 			/>)
	// 	})
	// }
	

	return(
		<figure {...figProps}>
				{/* wait till useDimension finishes */}
				{width && height && 
					<svg {...svgProps}>
						<g transform={`translate(${inheritedPadding},${inheritedPadding})`}>
							<text 
								className="plain-text"
								alignmentBaseline="hanging">
								Violin
							</text>

							{axis && thisAxis}


							{sumstat && 
								<path
									d={
										area()
										.x0(xNum(-sumstat.length))
										.x1(xNum(sumstat.length))
										.y(yScale(sumstat.x0))
									}
								/>
							}
						</g>
					</svg>
				}
		</figure>
	)
};

export default Violin;
