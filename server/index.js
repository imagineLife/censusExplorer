const express = require("express");
const {connectToMongo, startMongo} = require('./connectToDB')
const { setEnvVars }  = require('./setEnvVars')
const {shapeHandler} = require('./handlers/shape')
const { 
	isObj,
	notArr,
	isObject
} = require('./helpers');
async function appInit(){
	try{
		await setEnvVars();

		// setup express 
		const app = express();
		app.use(express.static("public"));


		//setup express route-handling
		app.get('/shape', startMongo, shapeHandler)


		app.listen(process.env.PORT, () => {
		  console.log(`---API listening on port ${process.env.PORT}---`);
		});
	}catch(e){
		console.log('MONGO ERROR')
		console.log(e);
	}	
}

appInit();