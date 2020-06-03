import React, { 
	useState, 
	useEffect,
	useRef 
} from 'react'
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'
import './Axis.css'
import { wrap } from './../../helpers'

const Axis = ({orient, scale, translate, width, ticks}) => {
  
  const axisElement = useRef()

  //after loading <g> ref
  useEffect(() => {
  	if(axisElement && axisElement.current){
  		let axisRef = axisElement.current
  		const axisType = `axis${orient}`
	  
	    const axis = d3Axis[axisType]()
	      .scale(scale)
	      // .tickSize(-tickSize)
	      // .tickPadding([12])
	      // .ticks(5)

      if(ticks){
        console.log('TICKS!');
        axis.ticks(ticks)
      }

	    d3Select(axisRef).call(axis)
	    if(orient == 'bottom'){
	      d3Select(axisRef).selectAll(".tick text")
	      .call(wrap, scale.bandwidth())
	    }
  	}
  },[axisElement, width])

  return (
    <g
      className={`Axis Axis-${orient}`}
      ref={axisElement}
      transform={translate}
    />
  )
}

export default Axis;