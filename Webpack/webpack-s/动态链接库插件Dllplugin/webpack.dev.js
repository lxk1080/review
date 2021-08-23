const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
const { distPath } = require('./paths')

module.exports = merge(webpackCommonConf, {
  mode: 'development',

  module: {
    rules: [
      // 开发环境，直接引入图片 url，比较方便
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: 'file-loader'
      }
    ]
  },

  output: {
    filename: 'bundle.[contenthash:8].js',
    path: distPath,
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
    // dll 文件夹不要删除
    // 注意：CleanWebpackPlugin 会默认清空 output.path 文件夹里的内容，使用 CleanWebpackPlugin 时，一定要在上面写上 output.path 的值
    // 否则此插件无效
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        '!dll/**'
      ],
    }),

    new webpack.DefinePlugin({
      ENV: JSON.stringify('development')
    }),

    // 告诉 Webpack 使用了哪些动态链接库，注意，如果在 module.rules 的 js 编译中没有排除掉 node_modules
    // 需要把当前链接库的内容排除掉，例如 exclude: /node_modules/react，有了链接库就不需要再编译了
    new DllReferencePlugin({
      // 描述 react 动态链接库的文件内容
      manifest: require(path.join(distPath, 'dll', 'lib.manifest.json')),
    }),
  ],
})
