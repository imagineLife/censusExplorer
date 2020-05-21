const { flattenRow } = require('./../../helpers')
const tableHandler = async (req, res) => {
	try{
		// let firstDataElement = await req
		await req
			.dbCollection
			// .find({state: "New York"})
			// .project({
			// 	state: 1,
			// 	_id: 0
			// })
			.aggregate(
				[
					{
						$match: { 
							state: "New York" 
						}
					}
				]
			)
			.project({
				_id: 0, 
				state: 1, 
				"Percent Below Poverty|Gender|Male": "$percentBelowPoverty.gender.male",
				"Percent Below Poverty|Gender|Female": "$percentBelowPoverty.gender.female",
				"Percent Below Poverty|Age|<5": "$percentBelowPoverty.age.<5",
				"Percent Below Poverty|Age|5-17": "$percentBelowPoverty.age.5-17",
				"Percent Below Poverty|Age|18-34": "$percentBelowPoverty.age.18-34",
				"Percent Below Poverty|Age|35-64": "$percentBelowPoverty.age.35-64",
				"Percent Below Poverty|Age|65+": "$percentBelowPoverty.age.65+",
				"Percent Below Poverty|Education|noHS":"$percentBelowPoverty.education.noHS",
				"Percent Below Poverty|Education|hsGrad":"$percentBelowPoverty.education.hsGrad",
				"Percent Below Poverty|Education|someCollege":"$percentBelowPoverty.education.someCollege",
				"Percent Below Poverty|Education|bachPlus":"$percentBelowPoverty.education.bachPlus",
				"Percent Below Poverty|Education|total":"$percentBelowPoverty.education.total"
			})
			.toArray((err,arr) => {
				console.log('arr')
				console.log(arr)
				return res.json(arr).end()
			})
		// 	.find({})
		// 	.project({state:1})
			// ctData.aggregate([ { $match : {state: "New York"} } ], function(err,aggDeets){
			// 	if(err){
			// 		console.log('agg e')
			// 		console.log(err)
					
			// 	}
			// })
	}catch(e){
		console.log('e')
		console.log(e)
		
		res.json({"Error": e})
	}
}

module.exports = {
	tableHandler
}