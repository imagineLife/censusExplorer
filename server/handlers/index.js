const { shapeHandler } = require('./shape')
const { statsKeysHandler } = require('./statsKeys')
const { tableHandler } = require('./table')
const { statisticHandler } = require('./statistic')
const { singleStatHandler } = require('./singleStat')
const { scatterHandler } = require('./scatter')
module.exports = {
	shapeHandler,
	tableHandler,
	statisticHandler,
	statsKeysHandler,
	singleStatHandler,
	scatterHandler
}