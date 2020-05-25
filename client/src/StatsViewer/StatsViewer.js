import React, { useContext } from 'react';

//State
import { AppContext } from './../State/AppContext/AppContext'

const StatsViewer = () => {

	const {statsData} = useContext(AppContext);
	
	let svContent = <p>loading stats data...</p>

	if(statsData){
		svContent = <p>LOADED statsData!</p>
	}

	return <section id="app-wrapper">{svContent}</section>;
};

export default StatsViewer;
