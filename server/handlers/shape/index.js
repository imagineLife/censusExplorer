const { isObject } = require('./../../helpers');

const shapeHandler = async (req, res) => {
	try{
		let firstDataElement = await req.dbCollection.findOne()
	
		let resObj = {}
		let keys = Object.keys(firstDataElement);

		//loop through object keys
		keys.forEach(k => {
			if(k !== '_id'){

				//get key-value
				let keyedDataVal  = firstDataElement[k]
				let objType = isObject(keyedDataVal)
				if(!objType){
					resObj[k] = typeof keyedDataVal
					return;
				}

				//IF key-value is an object...
				// loop through object keys
				resObj[k] = {}
				let objValKeys = Object.keys(keyedDataVal)
				objValKeys.forEach(ovk => {
					let nestedKeyedDataVal  = firstDataElement[k][ovk]
					
					let isNestedObj = isObject(nestedKeyedDataVal)
					if(!isNestedObj){
						// console.log(`NOT nested obj: ${k}`);
						resObj[k][ovk] = typeof keyedDataVal
						return;
					}

					//IF key-value is an object...
				// loop through object keys
					resObj[k][ovk] = {}
					let nestedObjKeys = Object.keys(nestedKeyedDataVal)
					nestedObjKeys.forEach(nestedObjKey => {
						let doubleNestedKeyedDataVal  = firstDataElement[k][ovk][nestedObjKey]
						let isDoubleNestedObj = isObject(doubleNestedKeyedDataVal)
						if(!isDoubleNestedObj){
							// console.log(`NOT nested obj: ${k}`);
							resObj[k][ovk][nestedObjKey] = typeof doubleNestedKeyedDataVal
							return;
						}
					})
				})
			}
		})
		req.dbClient.close()
		return res.json(resObj)
	}catch(e){
		console.log('e')
		console.log(e)
		req.dbClient.close()
		res.json({"Error": e})
	}
}

module.exports = {
	shapeHandler
}