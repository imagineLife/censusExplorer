import React, { useState, useEffect, useRef , Fragment} from 'react';
import useDimensions from './../../Hooks/UseDimensions'
import { scaleBand, scaleLinear } from 'd3-scale'
import * as dg from 'd3-geo'
import * as d3Select from 'd3-selection'
import * as d3Z from 'd3-zoom'
import * as topo from "topojson-client"
import './Map.scss';

// Components

const MapBox = ({
	col,
	data,
	h,
	mapFile
}) => {
	
	const [divSize] = useState({w: 975, h: 610})
	const [centerX] = useState(divSize.w / 2)
	const [centerY] = useState(divSize.h / 2)
	//get dims, configured from props
	const [ref, {width, height}] = useDimensions();
	const [fetchedData, setFetchedData] = useState(false)
	const [stateData, setStateData] = useState(null)
	const inheritedPadding = 8;
	const chartPadding = 20;
	const whiteStroke = '#a9b7c9'
	const boxFill = 'rgb(38,49,20)'
	const gRef = useRef()

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
			viewBox:"0 0 975 610",
			id: 'map-svg',
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

	//d3-needed selected-state
	let selectedState = null;

		//mock data fetch
	useEffect(() => {
		if(!fetchedData){
			const FetchData = async () => {
				// https://github.com/topojson/us-atlas
				const usData = require('./../../mockData/us-10m.json')
				setStateData(usData)
			}
			FetchData()
			setFetchedData(true)
		}
	},[fetchedData])

	//setup D3 + TopoJson + Choropleth map
	useEffect(() => {
		if(
			gRef && gRef.current
		){

			const d3Path = dg
				.geoPath()
			
			const clickedState = async d => {
		  	const gSelection = d3Select.select(gRef.current)
		  	var x, y, k;
		    const didNotClickCurrentState = selectedState !== d
		    if (d && didNotClickCurrentState) {
		      var centroid = d3Path.centroid(d);
		      
		      x = centroid[0];
		      y = centroid[1];
		      k = 6;
		      selectedState = d;
		    } else {
		      x = divSize.w / 2;
		      y = divSize.h / 2;
		      k = 1;
		      selectedState = null;
		    }

		    //set class, pick-up orange color
		    gSelection.selectAll("path")
		      .classed("active", selectedState ? d => d === selectedState : false);

		    gSelection.transition()
		        .duration(550)
		        .attr("transform", `translate(${ centerX },${centerY}) scale(${k}) translate(${-x},${-y})`)
		  }

			const enterStates = e => {
		    e.append("path")
		    .attr("d", d3Path)
		    .style('vector-effect', 'non-scaling-stroke')
		    .attr('class', 'boundary')
		  	.on('click', clickedState)
		  }

		  const updateStates = u => {
		  	//zoom fn
				const zoomed = () => {
		        d3Select.selectAll('path.boundary')
		        .attr('transform', d3Select.event.transform);
		    }

				const zoom = d3Z.zoom()
		      .scaleExtent([1, 8])
		      .on('zoom', zoomed);

		    d3Select.select('#map-svg').call(zoom);
		  }

			//get svg && g elements in d3-land
			const d3SVG = d3Select.select('#map-svg')
			const d3g = d3Select.select('#map-g')
			
			const stateFeats = topo.feature(stateData, stateData.objects.states).features
			
	   	const statePathsDJ = d3SVG
	    	.select('#map-g').selectAll('path')
	    	.data(stateFeats)
  		statePathsDJ.join(enterStates, updateStates)
		}
	})
	return(
		<figure {...figProps}>
				{/* wait till useDimension finishes */}
				{width && height && 
					<Fragment>
						<h1 className="map-title">Map</h1>
						<svg {...svgProps}>
							<g 
								id="map-g"
								transform={`translate(${inheritedPadding},${inheritedPadding})`}
								ref={gRef}>
								
							</g>
						</svg>
					</Fragment>
				}
		</figure>
	)
};

export default MapBox;
/*
	<text 
		className="plain-text"
		alignmentBaseline="hanging">
		Map
	</text>
*/ 