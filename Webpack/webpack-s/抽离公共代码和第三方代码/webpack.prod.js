
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackCommonConf = require('./webpack.common.js')
const { distPath } = require('./paths')

module.exports = merge(webpackCommonConf, {
  mode: 'production',

  output: {
    filename: '[name].[contenthash:8].js',  // name 即多入口时 entry 的 key
    path: distPath,
    // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
  },

  module: {
    rules: [
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
  ],

  optimization: {
    // 分割代码块
    splitChunks: {
      // initial 入口 chunk，对于异步导入的文件不处理
      // async 异步 chunk，只对异步导入的文件处理
      // all 全部 chunk
      chunks: 'all',

      // 缓存分组
      cacheGroups: {
        // 第三方模块
        vendor: {
          name: 'vendor', // chunk 名称
          priority: 1, // 值越大，权限更高，优先抽离，重要！！！就比如 lodash 模块，既是第三方模块，也是公共模块，我们期待能命中这个 chunk
          test: /node_modules/, // 至于怎么命中这个 chunk，是通过匹配模块的来源路径，这里路径匹配到了 node_modules，就说明是第三方模块
          minSize: 2048,  // 大小限制，最小分组大小，小于这个大小的 module 不进行抽离，太小了抽离没意义，单位 bytes
          minChunks: 1  // 最少复用过几次，这里写 1，对于第三方模块，只要用了就抽离
        },

        // 公共的模块
        common: {
          name: 'common', // chunk 名称
          priority: 0, // 优先级，最好优先级低的写在下面，优先级高的写在上面，因为这样正好对应 html 里的加载顺序，优先级高的先加载，入口 bundle 是最后加载的
          minSize: 0,  // 公共模块的大小限制，小于此值不进行抽离
          minChunks: 2  // 公共模块最少复用过几次，这里用 2 次就抽离，如果只用了一次，那就没必要抽离了
        }
      }
    }
  }
})
