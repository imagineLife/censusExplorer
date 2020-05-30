import React from 'react';
import './Scalar.scss'

const Scalar = ({label, value, className}) => {
	let thisClass = "scalar col-6-2"
	
	if(className){
		thisClass = `${thisClass} ${className}`
	}
	
	return(
		<figure className={thisClass}>
			<h3 className="scalar-label">{label}</h3>
			<span className="scalar-value">{value}</span>
		</figure>
	)
};

export default Scalar;
