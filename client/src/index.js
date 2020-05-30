import React, { useContext } from "react"
import ReactDOM from "react-dom"
import './reset.css'
import './normalize.css'
import './float-grid.css';
import "./index.scss";

//State
// import { AppProvider } from './State/AppContext/AppContext'

//Components
import Router from './Router';
// import StatsViewer from './StatsViewer'

const rootElement = document.getElementById("app")

if(rootElement !== null){
	ReactDOM.render(<Router />
		, rootElement);
}

/*
	<AppProvider>
			<StatsViewer />
		</AppProvider>
*/ 