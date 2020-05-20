const { isObject } = require('./../server/helpers')
//1-layer-deep
const obj = {
	"name": "jake",
	"job": "human",
	"drinks": "coffee"
}

const toFancyObj = (hdr, val) => ({ header: hdr, value: val})

//1-layer
const convert = (o) => {
	let resArr = []
	Object.keys(o).forEach((k, idx) => {
		resArr.push(toFancyObj(k, obj[k]))
		if(idx === Object.keys.length - 1){
			return resArr;
		}
	})
}

async function keyValToObj(k, obj){
	console.log('- - - keyValToObj start');
	console.log('k');
	console.log(k);

	return new Promise(res => {
		//get key-value type
		const keyIsObject = isObject(obj)

		//not object
		if(!keyIsObject){
			res(toFancyObj(k, obj))
		
		//IS an object
		}else{
			
			//get key
			console.log('deepConvert FROM keyValToObj');
			deepConvert(obj).then(resArr => {
				console.log('---deepConvert result');
				console.log(resArr);
				res(resArr);
			}) 
		}
	})
}

//2-layers
const deepConvert = async (nestedO) => {
	console.log('DEEP CONVERT!');
	console.log('nestedO')
	console.log(nestedO)
	
	return new Promise((res) => {
		//get keys
		const keys = Object.getOwnPropertyNames(nestedO)

		let resArr = []
		//return array
		return keys.forEach((k,idx) => {

			let thisKeyObject = nestedO[k]
			
			//
			keyValToObj(k, thisKeyObject).then(resObj => {
				console.log('*** keyValToObj resObj ***')
				console.log(resObj)
				console.log('// - - - - - //')
				
				resArr.push(resObj)

				if(idx === keys.length - 1){
					console.log('FINISHING DEEP CONVERT');
					res(resArr)
				}
			})
		})
	})
}


//1-layer...
const ready = convert(obj)
/*
	Returns...
	[
	  { header: 'name', value: 'jake' },
	  { header: 'job', value: 'human' },
	  { header: 'drinks', value: 'coffee' }
	]
*/



//2-layers-deep
let twoLayers = {
	"smallObject": {
		"name": "jake",
		"job": "human",
		"drinks": "coffee"
	},
	"flatKey": "flatKeyVal"
}
console.log(new Date());
deepConvert(twoLayers).then(arr => {
	console.log('--- DONE! ---');
	console.log(arr);
	// console.log(new Date())
})
