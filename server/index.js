const express = require("express");
const {connectToMongo, startMongo} = require('./connectToDB')
const { setEnvVars }  = require('./setEnvVars')
const { 
	isObj,
	notArr,
	isObject
} = require('./helpers');
async function appInit(){
	try{
		await setEnvVars();

		//connect && retrieve single element
		// await connectToMongo();
		console.log('INIT DONE!');

	// setup express 
		const app = express();
		app.use(express.static("public"));


		app.get('/shape', startMongo, async (req, res) => {
			console.log('SHAPE!');
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
			return res.json(resObj)
		})

		app.get('/', (req,res) => res.json({"dummy": "object result"}))

		app.listen(process.env.PORT, () => {
		  console.log(`Your app is listening on port ${process.env.PORT}`);
		});
	}catch(e){
		console.log('MONGO ERROR')
		console.log(e);
	}	
}

appInit();