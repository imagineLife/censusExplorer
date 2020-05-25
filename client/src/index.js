import React from "react"
import ReactDOM from "react-dom"
import './normalize.css'
import "./index.scss";
import { AppProvider } from './State/AppContext/AppContext'

const App = () => <section id="app-wrapper">App Component</section>;

const rootElement = document.getElementById("app")

if(rootElement !== null){
	ReactDOM.render(
		<AppProvider>
			<App />
		</AppProvider>, rootElement);
}