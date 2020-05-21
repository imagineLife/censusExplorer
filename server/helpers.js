//type-checking objects && arrays
const isObj = itm => typeof itm === "object"
const notArr = itm => !Array.isArray(itm)
const isObject = itm => isObj(itm) && notArr(itm)
const flattenRow = (obj) => obj;

module.exports = {
	isObj,
	notArr,
	isObject,
	flattenRow
}