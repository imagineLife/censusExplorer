import React, { 
	useContext,
	Fragment 
} from 'react';
import './statsViewer.scss'

//Components
import Dropdown from './../Components/Dropdown'
import Scalar from './../Components/Scalar'

//State
import { AppContext } from './../State/AppContext/AppContext'

const StatsViewer = () => {

	const {
		statsData, 
		statsList,
		selectedStatKey,
		updateSelectedStat
	} = useContext(AppContext);
	
	let svContent = <p>loading stats data...</p>

	if(statsData && selectedStatKey && statsList){
		console.log('statsData')
		console.log(statsData)
		
		const ddProps = {
			displayText: selectedStatKey,
			label: "Currently viewing:",
		  className: "stat-picker",
		  onClick: () => { console.log('CLICKED DD')}
		}
		svContent = <Fragment>
				<header className="stats-header row">
					<h2>Statistics Highlights</h2>
					<sub>Details on a single statistic</sub>

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
			</section>
			</Fragment>

	}

	return <section id="app-wrapper">{svContent}</section>;
};

export default StatsViewer;
