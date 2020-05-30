import React, { useContext } from "react"
import ReactDOM from "react-dom"
import './reset.css'
import './normalize.css'
import './float-grid.css';
import "./index.scss";

//Components
import RouterComponent from './Router';

const rootElement = document.getElementById("app")

if(rootElement !== null){
	ReactDOM.render(<RouterComponent />
		, rootElement);
}