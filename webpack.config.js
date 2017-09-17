const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    library: 'FreezeCssColumns',
    libraryTarget: 'window',
    path: path.join(__dirname, '/dist'),
    filename: 'es5.js'
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
  }
}
