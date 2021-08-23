const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath } = require('./paths')

module.exports = {
  entry: {
    index: path.join(srcPath, 'index.js'),
    other: path.join(srcPath, 'other.js')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: srcPath,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },

  plugins: [
    // 多入口 - 生成 index.html
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other，还有通过 splitChunks 分割的模块）
      chunks: ['index', 'vendor', 'common']  // 考虑代码分割，事实上在 webpack5，已经会根据入口文件自动识别该加载哪些分割的 chunk 了，有用的会自动加载，没用的就算写了也不会加载

      // 1、这里 chunks 的顺序无所谓，webpack 会自动识别哪个是入口 chunk，但是如果不写入口 chunk，只写后面的分割 chunk，那么页面中将不会插入任何 bundle
      // 2、如果是空数组，那么页面中也不会插入任何 bundle
      // 3、如果不写 chunks 这个属性，则默认插入所有 bundle
      // 总之：如果用 webpack5，就写一个入口 chunk 就行了，如果是 webpack4，就把页面中需要用到的 chunk 都写一下
    }),

    // 多入口 - 生成 other.html
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'other.html'),
      filename: 'other.html',
      chunks: ['other', 'common']  // 考虑代码分割
    })
  ]
}
