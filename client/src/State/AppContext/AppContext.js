import React, { createContext } from 'react';

const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = ({children}) => {
	// let [statsData, setStatsData] = useState(null)
	return(
		<Provider value={{dummy: "value"}}>
			{children}
		</Provider>
	)
}

export { AppContext, AppProvider};
