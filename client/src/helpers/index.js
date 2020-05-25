const fetcher = (url) => {
	return fetch(url)
	.then(res => {
		if(res.status == 200){
			res.json().then(jsonRes => {
				return { result: jsonRes }
			})
		}else{
			res.json().then(jsonRes => {
				return {"Error": "non-200"}	
			})
		}
	})
	.catch(e => {
		return {"Error": e}
	})
}

export {
	fetcher
}