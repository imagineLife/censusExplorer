const projectionObj = require('./projectionObject')
const tableHandler = async (req, res) => {
	try{

		//prepare dbrequest
		let dbRequest = req.dbCollection
		
		//default, show only 5
		if(!req.params.state){
			dbRequest = dbRequest.aggregate([{$limit:5}])
		}

		if(req.params.state){
			let stateArr = req.params.state.match(/[A-Z][a-z]+/g)
			let thisState = stateArr[0]
			if(stateArr.length > 1){
				thisState = `${stateArr[0]} ${stateArr[1]}`
			}
			dbRequest = dbRequest.aggregate(
				[
					{
						$match: { 
							state: thisState
						}
					}
				]
			)
		}

		await dbRequest
			.project(projectionObj)
			.toArray((err,arr) => {
				return res.json(arr).end()
			})
	}catch(e){
		console.log('e')
		console.log(e)
		
		res.json({"Error": e})
	}
}

module.exports = {
	tableHandler
}