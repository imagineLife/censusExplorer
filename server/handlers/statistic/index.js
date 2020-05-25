const statisticHandler = async (req, res) => {
	try{

		//prepare dbrequest
		let dbRequest = req.dbCollection

		await dbRequest
			.aggregate([
			{
				"$project": { 
					"_id": 0, 
					"x": "$state", 

					//default to percent-below-poverty men @ each state
					"y": "$percentBelowPoverty.gender.male",
				}
			}
			])
			.toArray((err,arr) => {
				if(err){
					req.dbClient.close()
					return res.status(500).json({"Error": err});
				}
				if(arr.length < 1){
					req.dbClient.close()
					return res.status(422).json({'Error': "Bad State"});
				}
				req.dbClient.close()
				return res.json(arr).end();
			})
	}catch(e){
		console.log('e')
		console.log(e)
		res.json({"Error": e})
	}
}

module.exports = {
	statisticHandler
}