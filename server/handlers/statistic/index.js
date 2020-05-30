const ar = require('d3-array')

const statisticHandler = async (req, res) => {
	try{

		//prepare dbrequest
		let dbRequest = req.dbCollection

		let defaultStatString = 'percentBelowPoverty.gender.male'
		await dbRequest
			.aggregate([
			{
				"$project": { 
					"_id": 0, 
					"x": "$state", 

					//default to percent-below-poverty men @ each state
					"y": `$${defaultStatString}`,
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

				//stats collective vals
				let max = null, min = null, total = null, itms = null, median = null;
				arr.forEach(itm => {
					let yVal = parseFloat(itm.y)
					itms ++;

					//first iteration
					if(!max){
						max = yVal
					}
					if(!min){
						min = yVal
					}

					//update stats
					total = total += yVal

					if(yVal < min){
						min = yVal
					}

					if(yVal > max){
						max = yVal
					}
				})

				//finding median
				let sorted = arr.sort((a,b) => parseFloat(b.y) - parseFloat(a.y))

				return res.json({
					avg: total / itms,
					data: arr,
					max,
					median: parseFloat(ar.median(arr, d => d.y).toFixed(2)),
					min,
					stat: defaultStatString, 
					range: parseFloat((max - min).toFixed(2)),
					variance: parseFloat(ar.variance(arr, d => d.y).toFixed(2)),
					["standard Deviation"]: parseFloat(ar.deviation(arr, d => d.y).toFixed(2))
				}).end();
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