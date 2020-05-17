const express = require("express");
const {connectToMongo} = require('./connectToDB')
const { setEnvVars }  = require('./setEnvVars')

async function appInit(){
	try{
		await setEnvVars();
		await connectToMongo();
		console.log('INIT DONE!');

	// setup express 
		const app = express();
		app.use(express.static("public"));


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