const { isObject } = require('./../../helpers');

const tableHandler = async (req, res) => {
	try{
		let firstDataElement = await req.dbCollection.findOne()
	
		return res.json(firstDataElement)
	}catch(e){
		console.log('e')
		console.log(e)
		
		res.json({"Error": e})
	}
}

module.exports = {
	tableHandler
}