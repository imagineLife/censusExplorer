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

	const {statsData} = useContext(AppContext);
	
	let svContent = <p>loading stats data...</p>

	if(statsData){
		svContent = <Fragment>
				<header className="stats-header">
					<h2>Statistics Highlights</h2>
					<sub>Details on a single statistic</sub>
					<Dropdown
						label="Currently viewing:"
					  className="stat-picker"
					  onClick={() => { console.log('CLICKED DD')}}
					>
						<p>1</p>
						<p>2</p>
						<p>3</p>
						<p>4</p>
						<p>5</p>
					</Dropdown>
				</header>
			</Fragment>

	}

	return <section id="app-wrapper">{svContent}</section>;
};

export default StatsViewer;
