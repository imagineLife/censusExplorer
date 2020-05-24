const htmlPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry:'./src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
		  {
		    test: /\.m?js$/,
		    exclude: /(node_modules|bower_components)/,
		    use: {
		      loader: 'babel-loader'
		    }
		  }
    ]
  },
  plugins: [
    new htmlPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
}