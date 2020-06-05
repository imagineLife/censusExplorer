import React, { useState, useEffect, useRef } from 'react';
import useDimensions from './../../Hooks/UseDimensions'
import { scaleBand, scaleLinear } from 'd3-scale'
import * as dg from 'd3-geo'
import { feature } from "topojson-client"
import './Map.scss';

// Components

const Map = ({
	col,
	data,
	h,
	mapFile
}) => {
	
	//get dims, configured from props
	const [ref, {width, height}] = useDimensions();
	// const [updatedFeats] = useState(feature(mapFile, mapFile).features)
	const [paths, setPaths] = useState(null)
	const inheritedPadding = 8;
	const chartPadding = 20;
	const whiteStroke = '#a9b7c9'
	const boxFill = 'rgb(38,49,20)'

	//  RE-Enable to display the map!
	useEffect(() => {
		if(!paths && data){
			const thesePaths = mapFile.features.map((feat,fIdx) => {
				const calcd = dg.geoPath().projection(dg
					.geoAlbersUsa()
					.translate([width / 2 ,height / 2])
					.scale([500]))(feat)
				return <path
					key={`feature-${fIdx}`} 
					d={calcd} 
					style={{
					stroke: 'gray',
					stokeWidth: 1,
					fill: 'none'
				}} />
			})
			setPaths(thesePaths)
		}
	}, []) //[width]

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
	// let svgProps = {}
	// if(width && height){
		let svgProps = {
			className:"chart-svg",
			width: width || 0,
			height: height || 0,
			transform: `translate(-${inheritedPadding}, -${inheritedPadding})`
		}

	/*
		Figure Props
	*/ 
	const figProps = {
		className:`boxplot widget ${col}`,
		style: {height: h},
		ref: ref
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
								Map
							</text>
							{paths && paths}
						</g>
					</svg>
				}
		</figure>
	)
};

export default Map;
