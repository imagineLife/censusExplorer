import React, { useEffect, useState } from 'react';
import useDimensions from './../../Hooks/UseDimensions'
import { fetcher } from './../../helpers'

const Scatterplot = ({data, axis, col, h, xStat}) => {
	const [scatterURL] = useState(`${process.env.SERVER_HOST}/scatterplot`);
	const [yAxisKey, setYAxisKey] = useState('percentBelowPoverty.gender.female');
	const [yAxisVals, setYAxisVals] = useState(null)
	const [fetchedScatterData, setFetchedScatterData] = useState(false)
	
	useEffect(() => {
		if(!yAxisVals &&!fetchedScatterData){
			const fetchScatterplotData = async () => {
				
				let reqBody = JSON.stringify({
					x: xStat,
					y: yAxisKey
				})
				
				let scatterData = await fetcher(`${scatterURL}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: reqBody
				})
				
				setYAxisVals([1,2,3])
			}
			fetchScatterplotData()
			setFetchedScatterData(true)
		}
	},[yAxisVals])

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

	return (
		<figure {...figProps}>
				{/* wait till useDimension finishes */}
				{width && height && 
					<svg {...svgProps}>
						<g transform={`translate(${inheritedPadding},${inheritedPadding})`}>
						</g>
					</svg>
				}
		</figure>
	)
};

export default Scatterplot;
