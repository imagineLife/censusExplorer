import React, { 
	useContext,
	Fragment 
} from 'react';
import './index.scss'

//Components
import Dropdown from './../Components/Dropdown'
import Scalar from './../Components/Scalar'

//State
import { AppContext } from './State/AppContext'

const StatsViewer = () => {
	const {
		statsData, 
		statsList,
		selectedStatKey,
		updateSelectedStat
	} = useContext(AppContext);
	
	let svContent = <p>loading stats data...</p>

	if(statsData && selectedStatKey && statsList){
		
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
				<Scalar 
					// className="bg-red-dark"
					value={statsData.max} 
					label="Maximum" />
				<Scalar 
					// className="bg-orange-dark"
					value={statsData.min} 
					label="Minimum" />
				<Scalar 
					// className="bg-yellow-dark"
					value={statsData.avg.toFixed(2)} 
					label="Average" />
				<Scalar 
					// className="bg-green-dark"
					value={statsData.median} 
					label="Median" />
				<Scalar 
					// className="bg-blue-dark"
					value={statsData['standard Deviation']} 
					label="Standard Deviation" />
				<Scalar 
					// className="bg-yellow-dark"
					value={statsData.variance} 
					label="Variance" />
			</section>
			</Fragment>

	}

	return <section id="app-wrapper">{svContent}</section>;
};

export default StatsViewer;
