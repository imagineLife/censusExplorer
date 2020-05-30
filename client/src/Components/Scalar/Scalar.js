import React from 'react';

const Scalar = ({label, value}) => (
	<figure className="scalar">
		<span className="scalar-value">{value}</span>
		<h3 className="scalar-label">{label}</h3>
	</figure>
);

export default Scalar;
