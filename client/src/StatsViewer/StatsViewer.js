import React, { 
	useContext,
	Fragment 
} from 'react';
import './index.scss'

//Components
import Dropdown from './../Components/Dropdown'
import Scalar from './../Components/Scalar'
// import Chart from './../Components/Chart'
import Boxplot from './../Components/Boxplot'
import Violin from './../Components/Violin'
import BarChart from './../Components/BarChart'
import ChartBox from './../Components/ChartBox'
import Map from './../Components/Map'

import stateFile from './../statesLess.geojson'

//State
import { AppContext } from './State/AppContext'

const StatsViewer = () => {
	const {
		statsData, 
		statsList,
		selectedStatKey,
		updateSelectedStat,
		 scalars
	} = useContext(AppContext);
	
	let svContent = <p>loading stats data...</p>

	if(statsData && selectedStatKey && statsList && scalars){
		
		const ddProps = {
			displayText: selectedStatKey,
			label: "Currently viewing:",
		  className: "stat-picker",
		  onClick: () => { console.log('CLICKED DD')}
		}
		
		svContent = <Fragment>
				<header className="stats-header row">
					<div id="text-wrapper">
						<h2>Statistics Highlights</h2>
						<sub>Details on a single statistic</sub>
					</div>

					{/* Stats-Chooser */}
					<Dropdown {...ddProps} >
						{statsList.map(({string, selected}, idx) => (
							<p 
								key={`single-stat-${string}`} 
								className="stats-itm"
								onClick={() => {
									updateSelectedStat(string)
								}}>
									{string}
							</p>)
						)}
					</Dropdown>
				</header>

			{/* Scalar Values */}
			<section className="dashboard row">
				{scalars.map((s,idx) => (
					<Scalar 
						key={`${s.label}-${idx}`}
						// {...s}
						value={statsData[s.value].toFixed(2)}
						label={s.label}
					/>
				))}
			</section>

			{/* Scalar Values */}
			<section className="dashboard row">
				<Boxplot 
					min={statsData.min}
					max={statsData.max}
					median={statsData.median}
					q1={statsData.q1}
					q3={statsData.q3}
					orientation="horizontal"
					axis
					col="col-6"
					h="300px"
				/>
				<BarChart 
					data={statsData.binnedCounts}
					orientation="vertical"
					axis
					yDomain={[0,24]}
					ticks={4}
					col="col-6"
					h="300px"
				/>
				{/*
				<Map 
					data={statsData.data}
					mapFile={stateFile}
					dataMapKey={'x'}
					col="col-12"
					h="300px"
				/>
				*/}

				<figure />
			</section>
			</Fragment>

	}

	return <section id="app-wrapper">{svContent}</section>;
};

export default StatsViewer; 

/*
	<Violin 
		data={statsData.data}
		min={statsData.min}
		max={statsData.max}
		median={statsData.median}
		q1={statsData.q1}
		q3={statsData.q3}
		orientation="horizontal"
		axis
		col="col-6"
		h="300px"
	/>
*/