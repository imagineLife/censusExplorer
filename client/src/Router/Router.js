import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Components
import StatsViewer from './../StatsViewer'

const RouterComponent = () => {
	const routerLookup = [
		{
			path: '/',
			component: StatsViewer
		}
	]
	return <Router>
		<Switch>
			{routerLookup.map((r, idx) => {
					const ThisRoute = r.component;
					let props = r.props || {}
					return (
						<Route
							key={`${r.component}-${idx}`}
							path={r.path}
						>
							<ThisRoute {...props} />
						</Route>
					)
				})
			}
		</Switch>
	</Router>
};

export default RouterComponent;
