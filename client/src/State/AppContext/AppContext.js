import React, { 
	createContext,
	useState
} from 'react';

const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = ({children}) => {
	let [statsData, setStatsData] = useState(null)
	return(
		<Provider value={{
			statsData
		}}>
			{children}
		</Provider>
	)
}

export { AppContext, AppProvider};
