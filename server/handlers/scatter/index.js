const ar = require('d3-array')

const scatterHandler = async (req, res) => {
	try{

		//prepare dbrequest
		let dbRequest = req.dbCollection

		let x, y
		if(Object.keys(req.body).length > 0){
			x = req.body.x;
			y = req.body.y;
		}else{
			res.status(422).json({"Error": "no dice"})
		}
		
		await dbRequest
			.aggregate([
			{
				"$project": { 
					"_id": 0, 
					"state": "$state", 
					"x": `$${x}`,
					"y": `$${y}`,
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
				console.log('arr')
				console.log(arr)
				
				
				return res.status(200).json(arr);
			})
	}catch(e){
		console.log('e')
		console.log(e)
		res.json({"Error": e})
	}
}

module.exports = {
	scatterHandler
}