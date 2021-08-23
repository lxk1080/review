const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath } = require('./paths')

module.exports = {
  entry: path.join(srcPath, 'index.js'),

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'], // 需要 .babelrc 文件配合，例如 React 项目需要 @babel/preset-react
        include: srcPath,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        // loader 的执行顺序是：从后往前
        // css-loader 会对 import 和 url() 进行处理，就像 js 解析 import/require() 一样
        // style-loader 将 css 代码以 style 标签的形式插入到 html 页面里
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        // 增加 less-loader，注意顺序
        use: ['style-loader', 'css-loader', 'less-loader']
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
