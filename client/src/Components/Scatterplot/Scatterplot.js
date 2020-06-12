import React, { useEffect, useState, useContext } from 'react';
import useDimensions from './../../Hooks/UseDimensions'
import { fetcher } from './../../helpers'
import { scaleBand, scaleLinear } from 'd3-scale'
import './Scatterplot.scss';

// Components
import Axis from './../Axis'
import ChartBox from './../ChartBox'
import Dropdown from './../Dropdown'

//State
import { AppContext } from './../../StatsViewer/State/AppContext'

const Scatterplot = ({axis, col, h, xStat}) => {

	const {statsList} = useContext(AppContext);
	
	const [scatterURL] = useState(`${process.env.SERVER_HOST}/scatterplot`);
	const [yAxisKey, setYAxisKey] = useState('percentBelowPoverty.gender.female');
	const [scatterData, setScatterData] = useState(null)
	const [fetchedScatterData, setFetchedScatterData] = useState(false)
	const [domainPadding] = useState(.05) //1% domain padding
	const [r] = useState(5); //circle radius

	useEffect(() => {
		if(!scatterData &&!fetchedScatterData){
			const fetchScatterplotData = async () => {
				
				let reqBody = JSON.stringify({
					x: xStat,
					y: yAxisKey
				})
				
				let res = await fetcher(scatterURL, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: reqBody
				})
				
				if(res.Error){
					console.log('Scatter data error');
					console.log(res.Error);
				}else{
					setScatterData(res)
				}
			}
			fetchScatterplotData()
			setFetchedScatterData(true)
		}
	},[scatterData])

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
		Figure Props
	*/ 
	const figProps = {
		className:`boxplot widget ${col}`,
		style: {height: h},
		ref
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

	let 
		xScale = null, 
		xAxis = null, 
		yScale = null, 
		yAxis = null;

	if(scatterData){

		//destructure scatter data
		const { data, xDomain, yDomain } = scatterData;

		//'padded' domain ranges
		let paddedXDomain = [xDomain[0] * (1 - domainPadding), (xDomain[1] * domainPadding) + xDomain[1]]
		let paddedYDomain = [0, (yDomain[1] * domainPadding) + yDomain[1]]
		// yDomain[0] * domainPadding

		/*
			xScale && axis
		*/
		xScale = scaleLinear()
			.domain(paddedXDomain)
			.range([chartPadding, chartWidth])

		xAxis = <Axis 
				orient={"Bottom"}
				scale={xScale}
				translate={`translate(0,${height - (chartPadding * 2 )})`}
				width={width}
			/>

		/*
			yScale && axis
		*/
		yScale = scaleLinear()
			.domain(paddedYDomain)
			.range([chartHeight, chartPadding])

		yAxis = <Axis 
			orient={"Left"}
			scale={yScale}
			translate={`translate(${chartPadding},0)`}
			// ticks={ticks}
			/>
	}
	return (
		<figure {...figProps}>
				{/* wait till useDimension finishes */}
				{width && height && 
					<svg {...svgProps}>
						<g transform={`translate(${inheritedPadding},${inheritedPadding})`}>
							<text 
								className="plain-text"
								alignmentBaseline="hanging">
									Scatterplot
							</text>
							{xAxis}
							{yAxis}
							{scatterData && scatterData.data && 
								scatterData.data.map((d, idx) => {
									const scaledX = xScale(d.x)
									const scaledY = yScale(d.y)
									return <circle
										key={`scatter-circle-${idx}`}
										cx={scaledX}
										cy={scaledY}
										r={r}
										onClick={() => {
											console.log({state: d.state, x: d.x, y: d.y})
										}}
										className='scatter-circle'
									/>
								})
							}
						</g>
					</svg>
				}
				{statsList && 
					<Dropdown 
						label="y-Axis" 
						className="scatter-dropdown"
						displayText={yAxisKey}
					>
						{statsList.map(({string, selected}, idx) => (
							<p 
								key={`dd-stat-${string}`} 
								className="scatter-dd"
								onClick={() => {
									setYAxisKey(string)
									setFetchedScatterData(false)
									setScatterData(null)
								}}>
									{string}
							</p>)
						)}
					</Dropdown>
				}
		</figure>
	)
};

export default Scatterplot;
