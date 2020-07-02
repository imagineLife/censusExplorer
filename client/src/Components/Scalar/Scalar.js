import React from 'react';
import './Scalar.scss'
import * as d3F from 'd3-format'

const Scalar = ({label, value, className, selectedStatKey}) => {
	let thisClass = "widget scalar col-6-2"
	
	if(className){
		thisClass = `${thisClass} ${className}`
	}

	let formattedVal = value
	let l = formattedVal.length
	if(l > 4){
		console.log('--BIG SCALAR--');
		console.log('selectedStatKey')
		console.log(selectedStatKey)
		let frm = d3F.format('.2s')
		formattedVal = frm(value)
		
	}
	
	return(
		<figure className={thisClass}>
			<h3 className="scalar-label">{label}</h3>
			<span className="scalar-value">{formattedVal}</span>
		</figure>
	)
};

export default Scalar;
