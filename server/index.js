const express = require("express");
const { startMongo } = require('./connectToDB')
const { setEnvVars }  = require('./setEnvVars')
const bodyParser = require('body-parser')
const { 
	tableHandler, 
	shapeHandler,
	statisticHandler,
	singleStatHandler,
	statsKeysHandler,
	scatterHandler
} = require('./handlers')
async function appInit(){
	try{
		await setEnvVars();

		// setup express 
		const app = express();
		app.use(express.static("public"));
		
		
		//allow req from localhost in development
		if (process.env.NODE_ENV === 'development') {
		  app.use((req, res, next) => {
		    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
		    res.header(
		      'Access-Control-Allow-Headers',
		      'Content-Type,Authorization,Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Access-Control-Request-Method, Access-Control-Request-Headers, samesite'
		    );
		    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
		    res.header('Access-Control-Allow-Credentials', 'true');
		    if (req.method === 'OPTIONS') {
		      return res.sendStatus(204);
		    }
		    next();
		  });
		}

		app.use(bodyParser.json());
		//route-handling
		app.get('/shape', startMongo, shapeHandler)
		app.get('/table', startMongo, tableHandler)
		app.get('/table/:state', startMongo, tableHandler)
		app.get('/statsKeys', startMongo, statsKeysHandler)
		app.get('/statsKeys/:statsKey', startMongo, statsKeysHandler)
		app.post('/statistic/single', startMongo, singleStatHandler)
		app.get('/statistic/:statsKey', startMongo, statisticHandler)
		app.get('/statistic', startMongo, statisticHandler)
		app.post('/scatterplot',startMongo, scatterHandler)
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