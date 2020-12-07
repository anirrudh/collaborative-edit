const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/rtc/index.ts',
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
    filename: 'server.js',
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
    port: 8090,
    historyApiFallback: true,
    open: true
  },
   };
