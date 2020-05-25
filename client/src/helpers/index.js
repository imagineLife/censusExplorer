const fetcher = async (url, opts) => {
	let fetchOpts = opts || {}
	let fetchRes = await fetch(url, fetchOpts)
	
	if(fetchRes.status == 200){
		fetchRes.json().then(jsonRes => {
			return { result: jsonRes }
		})
	}else{
		fetchRes.json().then(jsonRes => {
			return {"Error": "non-200"}	
		})
	}
}

export {
	fetcher
}