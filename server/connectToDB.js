const {MongoClient} = require('mongodb');

const startMongo = async (req, res, next) => {
     const uri = process.env.mongoURL;
 

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        let statesCollection = await client.db("povertystates").collection('states');

        //pass collection to req. obj
        req.dbCollection = statesCollection;
        req.dbClient = client;
        next();
    } catch (e) {
        console.error(e);
        return {"Error": e}
    }
}
module.exports = { startMongo }