const htmlPlugin = require('html-webpack-plugin');
const path = require('path');
const wp = require('webpack');

module.exports = env => {

  // add environment keys in the command line
  // these will replace process.env.{VARIABLE} lines in the code
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
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
  		  },
        {
          test: /\.[cs]?[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.geojson$/,
          loader: 'json-loader'
        }
      ]
    },
    plugins: [
      // https://github.com/jantimon/html-webpack-plugin
      // Simplifies creation of HTML files to serve the webpack bundle
      new htmlPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      // this inserts envirnoment variables
      new wp.DefinePlugin(envKeys)
    ]
  }
}