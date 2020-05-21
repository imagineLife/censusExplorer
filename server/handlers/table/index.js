const { flattenRow } = require('./../../helpers')
const tableHandler = async (req, res) => {
	try{
		await req
			.dbCollection
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
				"_id": 0, 
				"state": 1, 
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
				"Percent Below Poverty|Race|white":"$percentBelowPoverty.race.white",
				"Percent Below Poverty|Race|black":"$percentBelowPoverty.race.black",
				"Percent Below Poverty|Race|Native American*":"$percentBelowPoverty.race.Native American*",
				"Percent Below Poverty|Race|Asian":"$percentBelowPoverty.race.Asian",
				"Percent Below Poverty|Race|Pacific Islander*":"$percentBelowPoverty.race.Pacific Islander*",
				"Percent Below Poverty|Race|Mixed":"$percentBelowPoverty.race.Mixed",
				"Percent Below Poverty|Race|Latino*":"$percentBelowPoverty.race.Latino*",
				"Percent Below Poverty|Race|total":"$percentBelowPoverty.race.total"
			})
			.toArray((err,arr) => {
				console.log('arr')
				console.log(arr)
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