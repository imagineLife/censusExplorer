const ar = require('d3-array')

const statisticHandler = async (req, res) => {
	try{

		//prepare dbrequest
		let dbRequest = req.dbCollection

		let statString = 'percentBelowPoverty.gender.male'
		if(req.params.statsKey){
			statString = req.params.statsKey
		}
		
		await dbRequest
			.aggregate([
			{
				"$project": { 
					"_id": 0, 
					"x": "$state", 

					//default to percent-below-poverty men @ each state
					"y": `$${statString}`,
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

				arr = arr.filter(d => d.x !== 'Puerto Rico')
				//stats collective vals
				let max = null, min = null, total = null, itms = null, median = null;

				arr.forEach(itm => {

					/*
						update min && max
					*/
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

				//Range
				let range = parseFloat((max - min).toFixed(2));

				//finding median
				let sorted = arr.sort((a,b) => parseFloat(b.y) - parseFloat(a.y))

				let q1 = (sorted[37].y + sorted[38].y) / 2
				let q3 = (sorted[12].y + sorted[13].y) / 2
				median = parseFloat(ar.median(arr, d => d.y).toFixed(2))

				let binnedByPercentage = {
					q1: {
						x: `${min}-${q1}`,
						y: 0
					},
					q2: {
						x: `${q1}-${median}`,
						y: 0
					},
					q3: {
						x: `${median}-${q3}`,
						y: 0
					},
					q4: {
						x: `${q3}-${max}`,
						y: 0
					}
				}
				//set bin counts
				arr.forEach((itm, idx) => {
					if(itm.y <= q1){
						binnedByPercentage.q1.y = binnedByPercentage.q1.y + 1;
					}
					if(itm.y > q1 && itm.y <= median){
						binnedByPercentage.q2.y = binnedByPercentage.q2.y + 1;
					}
					if(itm.y > median && itm.y <= q3){
						binnedByPercentage.q3.y = binnedByPercentage.q3.y + 1;
					}
					if(itm.y > q3){
						binnedByPercentage.q4.y = binnedByPercentage.q4.y + 1;
					}
				})
				
				return res.json({
					avg: parseFloat((total / itms).toFixed(2)),
					data: arr,
					max,
					median,
					min,
					q1,
					q3,
					stat: statString, 
					range,
					variance: parseFloat(ar.variance(arr, d => d.y).toFixed(2)),
					["standard Deviation"]: parseFloat(ar.deviation(arr, d => d.y).toFixed(2)),
					binnedCounts: [
						{
							x: binnedByPercentage.q1.x,
							y: binnedByPercentage.q1.y
						},
						{
							x: binnedByPercentage.q2.x,
							y: binnedByPercentage.q2.y
						},
						{
							x: binnedByPercentage.q3.x,
							y: binnedByPercentage.q3.y
						},
						{
							x: binnedByPercentage.q4.x,
							y: binnedByPercentage.q4.y
						}
					]
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