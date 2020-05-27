import React, { 
	useContext,
	Fragment 
} from 'react';
import './statsViewer.scss'

//Components
import Dropdown from './../Components/Dropdown'

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
		const ddProps = {
			displayText: selectedStatKey,
			label: "Currently viewing:",
		  className: "stat-picker",
		  onClick: () => { console.log('CLICKED DD')}
		}
		svContent = <Fragment>
				<header className="stats-header">
					<h2>Statistics Highlights</h2>
					<sub>Details on a single statistic</sub>
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
			</Fragment>

	}

	return <section id="app-wrapper">{svContent}</section>;
};

export default StatsViewer;
