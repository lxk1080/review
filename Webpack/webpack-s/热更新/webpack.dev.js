const path = require('path')
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const { srcPath, distPath } = require('./paths')

module.exports = merge(webpackCommonConf, {
  mode: 'development',

  entry: {
    index: [
      'webpack-dev-server/client?http://localhost:8080/', // 端口对应 devServer 里面设置的端口
      'webpack/hot/dev-server',
      path.join(srcPath, 'index.js')
    ],
  },

  module: {
    rules: [
      // 开发环境，直接引入图片 url，比较方便
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: 'file-loader'
      }
    ]
  },

  devServer: {
    port: 8080,
    progress: true,  // 显示打包的进度条
    contentBase: distPath,  // 启动根目录
    open: true,  // 自动打开浏览器
    compress: true,  // 启动 gzip 压缩

    hot: true, // 开启热更新

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
    }),

    new HotModuleReplacementPlugin(),
  ],
})
