import React, { useContext } from "react"
import ReactDOM from "react-dom"
import './normalize.css'
import "./index.scss";
import { AppProvider } from './State/AppContext/AppContext'

//Components
import StatsViewer from './StatsViewer'

const rootElement = document.getElementById("app")

if(rootElement !== null){
	ReactDOM.render(
		<AppProvider>
			<StatsViewer />
		</AppProvider>, rootElement);
}