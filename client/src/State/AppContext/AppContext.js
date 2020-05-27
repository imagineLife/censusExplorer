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
	const [selectedStatKey, setSelectedStatKey] = useState('percentBelowPoverty.gender.male');
	const [statsList, setStatsList] = useState(null)	//list of statistics && selected-state
	const [statsData, setStatsData] = useState(null)	//single-stat data
	const [fetchedStatsList, setFetchedStatsList] = useState(false)
	const [fetchedStat, setFetchedStat] = useState(false)
	const [statsUrl] = useState(`${process.env.SERVER_HOST}/statistic`);
	const [statsKeysUrl] = useState(`${process.env.SERVER_HOST}/statsKeys`);

	//fetch stats keys
	useEffect(() => {
		if(!statsList && !fetchedStatsList){
			const fetchStatsKeys = async () => {
				let statsRes = await fetcher(`${statsKeysUrl}/${selectedStatKey}`)
				setStatsList(statsRes)
			}
			fetchStatsKeys();
			setFetchedStatsList(true)
		}
	}, [statsData, fetchedStat])

	//fetch single-stat
	useEffect(() => {
		if(!statsData && !fetchedStat){
			const fetchStats = async () => {
				let statsRes = await fetcher(statsUrl)
				setStatsData(statsRes)
			}
			fetchStats();
			setFetchedStat(true)
		}
	}, [statsData, fetchedStat])

	console.log('statsList')
	console.log(statsList)
	
	const updateSelectedStat = (str) => {
		setStatsList(statsList.map(itm => {
			let newItm = itm
			newItm.selected = false;
			if(newItm.string === str){
				newItm.selected = true
			}
			return newItm
		}))
	}
	
	return(
		<Provider value={{
			statsData,
			statsList,
			selectedStatKey, 
			setSelectedStatKey,
			updateSelectedStat
		}}>
			{children}
		</Provider>
	)
}

export { AppContext, AppProvider};
