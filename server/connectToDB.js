const {MongoClient} = require('mongodb');

//connect to mongo instance
async function connectToMongo(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = process.env.mongoURL;
 

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        statesCollection = await client.db("povertystates").collection('states');
		statesCollection.find().limit(1).forEach(foundItem => console.log(JSON.stringify(foundItem)));
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

module.exports = { connectToMongo }