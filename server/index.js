const express = require("express");
const { startMongo } = require('./connectToDB')
const { setEnvVars }  = require('./setEnvVars')
const { 
	tableHandler, 
	shapeHandler,
	statisticHandler
} = require('./handlers')
async function appInit(){
	try{
		await setEnvVars();

		// setup express 
		const app = express();
		app.use(express.static("public"));


		//route-handling
		app.get('/shape', startMongo, shapeHandler)
		app.get('/table', startMongo, tableHandler)
		app.get('/table/:state', startMongo, tableHandler)
		app.get('/statistic', startMongo, statisticHandler)
		// app.get('/statistic/:type', startMongo, statisticHandler)

		app.listen(process.env.PORT, () => {
			console.log(`---API listening on port ${process.env.PORT}---`);
		});
	}catch(e){
		console.log('MONGO ERROR')
		console.log(e);
	}	
}

appInit();