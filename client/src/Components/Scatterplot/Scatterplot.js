import React, { useEffect, useState } from 'react';

const Scatterplot = () => {
	const [yAxisKey, setYAxisKey] = useState('percentBelowPoverty.gender.female');
	const [yAxisVals, setYAxisVals] = useState(null)

	useEffect(() => {
		if(!yAxisVals){
			console.log('FETCH yAxisVals here...');
			setYAxisVals([1,2,3])
		}
	},[yAxisVals])
	return (<p>Scatterplot</p>)
};

export default Scatterplot;
