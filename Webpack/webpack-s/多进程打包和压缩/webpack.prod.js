const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpackCommonConf = require('./webpack.common.js')
const HappyPack = require('happypack')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const { merge } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')

module.exports = merge(webpackCommonConf, {
  mode: 'production',

  output: {
    filename: 'bundle.[contenthash:8].js',  // 打包代码时，加上 hash 戳
    path: distPath,
    // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
  },

  module: {
    rules: [
      // js
      {
        test: /\.js$/,
        // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例，下面 css 同理
        use: ['happypack/loader?id=babel'],
        include: srcPath,
      },
      {
        test: /\.css$/,
        use: ['happypack/loader?id=css'],
        include: srcPath,
      },
      {
        test: /\.less$/,
        use: ['happypack/loader?id=less'],
        include: srcPath,
      },
      // 图片 - 考虑 base64 编码的情况
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 小于 5kb 的图片用 base64 格式产出
            // 否则，依然延用 file-loader 的形式，产出 url 格式
            limit: 5 * 1024,

            // 打包到 img 目录下
            outputPath: '/img1/',

            // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
            // publicPath: 'http://cdn.abc.com'
          }
        }
      },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
    new webpack.DefinePlugin({
      ENV: JSON.stringify('production')
    }),

    // happyPack 开启多进程打包
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件，下面 css 同理
      id: 'babel',
      // 如何处理 .js 文件，用法和 Loader 配置中一样
      loaders: ['babel-loader']
    }),

    new HappyPack({
      id: 'css',
      loaders: ['style-loader', 'css-loader', 'postcss-loader']
    }),

    new HappyPack({
      id: 'less',
      loaders: ['style-loader', 'css-loader', 'less-loader']
    }),

    // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
    new ParallelUglifyPlugin({
      // 传递 UglifyJS 的参数
      // 还是使用 UglifyJS 压缩，只不过帮助开启了多进程
      uglifyJS: {
        output: {
          beautify: false, // 最紧凑的输出
          comments: false, // 删除所有的注释
        },
        compress: {
          // 删除所有的 `console` 语句，可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出 出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true,
        }
      }
    })
  ]
})
