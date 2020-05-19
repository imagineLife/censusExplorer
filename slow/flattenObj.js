//1-layer-deep
const obj = {
	"name": "jake",
	"job": "human",
	"drinks": "coffee"
}

const convert = (o) => {
	return Object.keys(o).map(k => {
		return {
			header: k,
			value: obj[k]
		}
	})
}

const ready = convert(obj)
/*
	Returns...
	[
	  { header: 'name', value: 'jake' },
	  { header: 'job', value: 'human' },
	  { header: 'drinks', value: 'coffee' }
	]
*/

