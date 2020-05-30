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
				<Scalar value={statsData.min} label="Minimum" />
				<Scalar value={statsData.max} label="Maximum" />
			</section>
			</Fragment>

	}

	return <section id="app-wrapper">{svContent}</section>;
};

export default StatsViewer;
