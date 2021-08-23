const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath } = require('./paths')

module.exports = {
  entry: {
    index: path.join(srcPath, 'index.js'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: srcPath,
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
        template: path.join(srcPath, 'index.html'),
        filename: 'index.html'
    })
  ]
}
