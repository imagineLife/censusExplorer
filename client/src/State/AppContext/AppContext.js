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
	const [statsData, setStatsData] = useState(null)
	const [fetchedStats, setFetchedStats] = useState(false)
	const [statsUrl] = useState(`${process.env.SERVER_HOST}/statistic`);

	//fetch stats 
	useEffect(() => {
		if(!statsData && !fetchedStats){
			const fetchStats = async () => {
				let statsRes = await fetcher(statsUrl)
				setStatsData(statsRes)
			}
			fetchStats();
			setFetchedStats(true)
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
