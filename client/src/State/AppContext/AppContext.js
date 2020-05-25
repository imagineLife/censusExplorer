import React, { 
	createContext,
	useState
} from 'react';

//helper fns
import { fetcher } from './../../helpers'
const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = ({children}) => {
	let [statsData, setStatsData] = useState(null)
	let [fetchedStats, setFetchedStats] = useState(false)

	

	return(
		<Provider value={{
			statsData
		}}>
			{children}
		</Provider>
	)
}

export { AppContext, AppProvider};
