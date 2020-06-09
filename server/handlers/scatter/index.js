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
				let minX = null, 
				minY = null, 
				maxX = null, 
				maxY = null;
				arr.forEach(el => {
					if(el.x < minX || !minX) minX = el.x;
					if(el.x > maxX || !maxX) maxX = el.x;
					if(el.y < minY || !minY) minY = el.y;
					if(el.y > maxY || !maxY) maxY = el.y;
				})
				
				return res.status(200).json({
					data: arr,
					xDomain: [minX, maxX],
					yDomain: [minY, maxY]
				});
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