import React, { 
	createContext,
	useState,
	useEffect
} from 'react';

//helper fns
import { fetcher } from './../../helpers'
const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = ({children}) => {
	let [statsData, setStatsData] = useState(null)
	let [fetchedStats, setFetchedStats] = useState(false)

	useEffect(() => {
		if(!statsData && !fetchedStats){
			fetcher(process.env.SERVER_HOST).then(fetchRes => {
				console.log('fetchRes')
				console.log(fetchRes)
				
			})
			setFetchedStats(false)
		}
	}, [statsData, fetchedStats])
	return(
		<Provider value={{
			statsData
		}}>
			{children}
		</Provider>
	)
}

export { AppContext, AppProvider};
