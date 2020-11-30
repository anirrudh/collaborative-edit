const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.tsx',
  resolve: {
    alias: {
	    'ws': path.resolve(path.join(__dirname, 'node_modules/ws/index.js' )) // fix for https://github.com/websockets/ws/issues/1538
  }},

  module: {
       rules: [
      {
        test: /\.tsx?$/,
        use: {
		loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },},
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
    devServer: {
    proxy: {
	'/websocket': {
		target: 'ws://localhost:8090',
		ws: true
	},
    },
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    historyApiFallback: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
 };
