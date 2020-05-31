import React from 'react';
import useDimensions from './../../Hooks/UseDimensions'
const Boxplot = ({
	min,
	max,
	median,
	q1,
	q3,
	orientation,
	axis,
	height,
	w,
	col
}) => {
	const [ref, {width}] = useDimensions();
	
	return(
		<figure 
			className={`boxplot widget ${col}`}
			style={{w, height}}
			ref={ref}>
				Boxplot
		</figure>
	)
};

export default Boxplot;
