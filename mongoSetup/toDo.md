# Setting up a locally hosted mongo instance
_serving the needed data for this project to run locally_

### upload the data
```mongoimport --db povertystates --collection states --drop --file path/to/siblingFileHere/states.json```  
after this command, a locally servable mongo db called ```povertystates``` will exist, serving a collection called 	```states```
