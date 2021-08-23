const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')

module.exports = merge(webpackCommonConf, {
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'], // 开启缓存
        include: srcPath,
      },
      // 开发环境，直接引入图片 url，比较方便
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: 'file-loader'
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

  devServer: {
    port: 8080,
    progress: true,  // 显示打包的进度条
    contentBase: distPath,  // 启动根目录
    open: true,  // 自动打开浏览器
    compress: true,  // 启动 gzip 压缩

    // 设置代理
    proxy: {
      // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
      '/api': 'http://localhost:3000',

      // 将本地 /api2/xxx 代理到 localhost:3000/xxx
      '/api2': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '/api2': ''
        }
      }
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('development')
    })
  ],
})
