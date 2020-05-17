const envVars = require('./env.js')

//get/set env vars from env file
const setEnvVars = () => {
	return new Promise(res => {
		const envType = process.env.cli_env || 'dev'
		for(var thisEnv in envVars[envType]){
			process.env[thisEnv] = envVars[envType][thisEnv]
		}
		res()
	})
}
module.exports = { setEnvVars}