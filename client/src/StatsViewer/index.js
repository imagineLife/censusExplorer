import React from 'react';
import './index.scss'
import StatsViewer from './StatsViewer';
import { AppProvider } from './State/AppContext'

const WrappedStatsViewer = () => (
	<AppProvider>
		<StatsViewer />
	</AppProvider>
)
export default WrappedStatsViewer;
