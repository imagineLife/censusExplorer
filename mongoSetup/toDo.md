# Setting up && connecting to a locally hosted mongo instance
_serving the needed data for this project to run locally_
This project can be run locally. In order to do this, a few details need to be configured...
- a copy of the data && the db/collection naming details must be setup  
- a local mongo instance must be setup && running for the api to connect to

### create mongo db, collection, && upload data
```mongoimport --db povertystates --collection states --drop --file path/to/siblingFileHere/states.json```  
after this command, a locally servable mongo db called ```povertystates``` will exist, serving a collection called 	```states```

### turn on the mongo server, for the api to connect to