const express = require("express");
const {connectToMongo} = require('./connectToDB')

try{
	connectToMongo();
}catch(e){
	console.log('MONGO ERROR')
	console.log('e');
	
}

const app = express();
app.use(express.static("public"));


app.get('/', (req,res) => res.json({"dummy": "object result"}))

app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${process.env.PORT}`);
});
