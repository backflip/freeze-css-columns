const path = require('path')
const webpack = require('webpack')
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    library: 'FreezeCssColumns',
    libraryTarget: 'window',
    path: path.join(__dirname, '/dist'),
    filename: 'es5.min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['add-module-exports']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new UnminifiedWebpackPlugin()
  ]
}
