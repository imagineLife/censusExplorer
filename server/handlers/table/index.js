// const { flattenRow } = require('./../../helpers')
const tableHandler = async (req, res) => {
	try{
		await req
			.dbCollection
			// .aggregate(
			// 	[
			// 		{
			// 			$match: { 
			// 				state: "New York" 
			// 			}
			// 		}
			// 	]
			// )
			// .find({})
			.aggregate([{$limit: 5}])
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
				"Percent Below Poverty|Race|total":"$percentBelowPoverty.race.total",
				"Below Poverty|Gender|Male": "$belowPoverty.gender.male",
				"Below Poverty|Gender|Female": "$belowPoverty.gender.female",
				"Below Poverty|Age|<5": "$belowPoverty.age.<5",
				"Below Poverty|Age|5-17": "$belowPoverty.age.5-17",
				"Below Poverty|Age|18-34": "$belowPoverty.age.18-34",
				"Below Poverty|Age|35-64": "$belowPoverty.age.35-64",
				"Below Poverty|Age|65+": "$belowPoverty.age.65+",
				"Below Poverty|Education|noHS":"$belowPoverty.education.noHS",
				"Below Poverty|Education|hsGrad":"$belowPoverty.education.hsGrad",
				"Below Poverty|Education|someCollege":"$belowPoverty.education.someCollege",
				"Below Poverty|Education|bachPlus":"$belowPoverty.education.bachPlus",
				"Below Poverty|Race|white":"$belowPoverty.race.white",
				"Below Poverty|Race|black":"$belowPoverty.race.black",
				"Below Poverty|Race|Native American*":"$belowPoverty.race.Native American*",
				"Below Poverty|Race|Asian":"$belowPoverty.race.Asian",
				"Below Poverty|Race|Pacific Islander*":"$belowPoverty.race.Pacific Islander*",
				"Below Poverty|Race|Mixed":"$belowPoverty.race.Mixed",
				"Below Poverty|Race|Latino*":"$belowPoverty.race.Latino*",
				"Below Poverty|Race|total":"$belowPoverty.race.total",
				"Total|Gender|Male": "$total.gender.male",
				"Total|Gender|Female": "$total.gender.female",
				"Total|Age|<5": "$total.age.<5",
				"Total|Age|5-17": "$total.age.5-17",
				"Total|Age|18-34": "$total.age.18-34",
				"Total|Age|35-64": "$total.age.35-64",
				"Total|Age|65+": "$total.age.65+",
				"Total|Education|noHS":"$total.education.noHS",
				"Total|Education|hsGrad":"$total.education.hsGrad",
				"Total|Education|someCollege":"$total.education.someCollege",
				"Total|Education|bachPlus":"$total.education.bachPlus",
				"Total|Race|white":"$total.race.white",
				"Total|Race|black":"$total.race.black",
				"Total|Race|Native American*":"$total.race.Native American*",
				"Total|Race|Asian":"$total.race.Asian",
				"Total|Race|Pacific Islander*":"$total.race.Pacific Islander*",
				"Total|Race|Mixed":"$total.race.Mixed",
				"Total|Race|Latino*":"$total.race.Latino*",
				"Total|Race|total":"$total.race.total"
			})
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