import React from "react"
import ReactDOM from "react-dom"
import './normalize.css'
// import App from "./App";
import "./index.scss";

console.log('SERVER_HOST')
console.log(process.env.SERVER_HOST)

const App = () => <section id="app-wrapper">Something Here</section>;

ReactDOM.render(<App />, document.getElementById("app"));