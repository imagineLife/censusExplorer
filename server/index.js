const express = require("express");
const { startMongo } = require('./connectToDB')
const { setEnvVars }  = require('./setEnvVars')
const {shapeHandler} = require('./handlers/shape')
async function appInit(){
	try{
		await setEnvVars();

		// setup express 
		const app = express();
		app.use(express.static("public"));


		//route-handling
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