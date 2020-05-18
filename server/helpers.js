//type-checking objects && arrays
const isObj = itm => typeof itm === "object"
const notArr = itm => !Array.isArray(itm)
const isObject = itm => isObj(keyedDataVal) && notArr(keyedDataVal)

module.exports = {
	isObj,
	notArr,
	isObject
}