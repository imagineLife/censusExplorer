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
	const [emptyScatterHover] = useState({
		state: null,
		x: {
			string: null,
			value: null
		},
		y: {
			string: null,
			value: null
		}
	})
	const [selectedStatKey, setSelectedStatKey] = useState('percentBelowPoverty.gender.male');
	const [statsList, setStatsList] = useState(null)	//list of statistics && selected-state
	const [statsData, setStatsData] = useState(null)	//single-stat data
	const [fetchedStatsList, setFetchedStatsList] = useState(false)
	const [fetchedStat, setFetchedStat] = useState(false)
	const [statsUrl] = useState(`${process.env.SERVER_HOST}/statistic`);
	const [statsKeysUrl] = useState(`${process.env.SERVER_HOST}/statsKeys`);
	const [hoveredStats, setHoverStats] = useState(emptyScatterHover)
	const [scalars] = useState([
			{
				value: 'max',
				label: 'Maximum',
				className: 'bg-red-dark'
			},
			{
				value: 'min',
				label: 'Minimum',
				className: 'bg-orange-dark'
			},
			{
				value: 'avg',
				label: 'Average',
				className: 'bg-yellow-dark'
			},
			{
				value: 'median',
				label: 'Median',
				className: 'bg-green-dark'
			},
			{
				value: 'standard Deviation',
				label: 'Standard Deviation',
				className: 'bg-purple-dark'
			},
			{
				value: 'variance',
				label: 'Variance',
				className: 'bg-pink-dark'
			}
		])
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
				let statsRes = await fetcher(`${statsUrl}/${selectedStatKey}`)
				setStatsData(statsRes)
			}
			fetchStats();
			setFetchedStat(true)
		}
	}, [statsList, selectedStatKey])
	
	const updateSelectedStat = (str) => {
		setStatsList(statsList.map(itm => {
			let newItm = itm
			newItm.selected = false;
			if(newItm.string === str){
				newItm.selected = true
			}
			return newItm
		}))
		setSelectedStatKey(str)
		setStatsData(null)
		setFetchedStat(false)
	}
	
	return(
		<Provider value={{
			hoveredStats,
			statsData,
			statsList,
			selectedStatKey, 
			setHoverStats,
			setSelectedStatKey,
			updateSelectedStat,
			scalars
		}}>
			{children}
		</Provider>
	)
}

export { AppContext, AppProvider};
