const { isObject } = require('./../../helpers');

const statsKeysHandler = async (req, res) => {
	let statsKeys = ['percentBelowPoverty', 'gender', 'male'];
	
	if(req.params.statsKey){
		let statsKey = req.params.statsKey
		statsKeys = statsKey.split('.')
	}
	
	try{
		let firstDataElement = await req.dbCollection.findOne()
	
		let resArr = []
		let keys = Object.keys(firstDataElement);

		//loop through object keys
		keys.forEach(k => {
			if(!['_id','id','state'].includes(k)){

				//get key-value
				let keyedDataVal  = firstDataElement[k]
				let objType = isObject(keyedDataVal)
				if(!objType){
					resArr.push({
						string: k,
						selected: false
					})
					return;
				}

				//IF key-value is an object...
				// loop through object keys
				let objValKeys = Object.keys(keyedDataVal)
				objValKeys.forEach(ovk => {
					let nestedKeyedDataVal  = firstDataElement[k][ovk]
					
					let isNestedObj = isObject(nestedKeyedDataVal)
					if(!isNestedObj){
						resArr.push({
							string: `${k}.${ovk}`,
							selected: false
						})
						return;
					}

					//IF key-value is an object...
				// loop through object keys
					let nestedObjKeys = Object.keys(nestedKeyedDataVal)
					nestedObjKeys.forEach(nestedObjKey => {
						let doubleNestedKeyedDataVal  = firstDataElement[k][ovk][nestedObjKey]
						let isDoubleNestedObj = isObject(doubleNestedKeyedDataVal)
						if(!isDoubleNestedObj){
							resArr.push({
								string: `${k}.${ovk}.${nestedObjKey}`,
								selected: k === statsKeys[0] && ovk === statsKeys[1] && nestedObjKey === statsKeys[2] ? true : false
							})
							return;
						}
					})
				})
			}
		})
		req.dbClient.close()
		return res.json(resArr)
	}catch(e){
		console.log('e')
		console.log(e)
		req.dbClient.close()
		res.json({"Error": e})
	}
}

module.exports = {
	statsKeysHandler
}