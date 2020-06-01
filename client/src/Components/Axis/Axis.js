import React, { 
	useState, 
	useEffect,
	useRef 
} from 'react'
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'
import './Axis.css'
import { wrap } from './../../helpers'

const Axis = (props) => {
  
  const axisElement = useRef()

  //after loading <g> ref
  useEffect(() => {
  	if(axisElement && axisElement.current){
  		let axisRef = axisElement.current
  		const axisType = `axis${props.orient}`
	  
	    const axis = d3Axis[axisType]()
	      .scale(props.scale)
	      // .tickSize(-props.tickSize)
	      // .tickPadding([12])
	      // .ticks(5)

	    d3Select(axisRef).call(axis)
	    if(props.orient == 'bottom'){
	      d3Select(axisRef).selectAll(".tick text")
	      .call(wrap, props.scale.bandwidth())
	    }
  	}
  },[axisElement])

  return (
    <g
      className={`Axis Axis-${props.orient}`}
      ref={axisElement}
      transform={props.translate}
    />
  )
}

export default Axis;