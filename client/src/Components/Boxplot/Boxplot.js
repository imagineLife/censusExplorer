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
	h,
	col
}) => {

	//get dims, configured from props
	const [ref, {width, height}] = useDimensions();
	const inheritedPadding = 8;

	let twoPads;
	let wLP;
	let hLP;

	if(width && height){
		//'SQUISH' the svg to fit inside dims LESS PADDING
		twoPads = inheritedPadding * 2
		wLP = width - twoPads
		hLP = height - twoPads
	}

	let svgProps = {}
	if(width && height){
		svgProps = {
			className:"chart-svg",
			width: width,
			height: height,
			transform: `translate(-${inheritedPadding}, -${inheritedPadding})`
		}
	}
	return(
		<figure 
			className={`boxplot widget ${col}`}
			style={{height: h}}
			ref={ref}>
				{/* wait till useDimension finishes */}
				{width && height && 
					<svg {...svgProps}>
						<text 
							className="svg-title"
							transform={`translate(${inheritedPadding},${inheritedPadding})`}
							alignmentBaseline="hanging">
							Boxplot
						</text>
					</svg>
				}
		</figure>
	)
};

export default Boxplot;
