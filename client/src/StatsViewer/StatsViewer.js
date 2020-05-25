import React, { 
	useContext,
	Fragment 
} from 'react';

//State
import { AppContext } from './../State/AppContext/AppContext'

const StatsViewer = () => {

	const {statsData} = useContext(AppContext);
	
	let svContent = <p>loading stats data...</p>

	if(statsData){
		svContent = <Fragment>
				<header>
					<h2>Statistics Highlights</h2>
					<sub>Details on a single statistic</sub>
				</header>
			</Fragment>

	}

	return <section id="app-wrapper">{svContent}</section>;
};

export default StatsViewer;
