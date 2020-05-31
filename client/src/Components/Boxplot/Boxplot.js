import React from 'react';

const Boxplot = ({
	min,
	max,
	median,
	q1,
	q3,
	orientation,
	axis,
	height,
	col
}) => {
	return(
		<figure 
			className="boxplot widget"
			style={{height}}>
				Boxplot
		</figure>
	)
};

export default Boxplot;
