# webpack-s

测试使用的是 webpack5 的版本，v4 升级 v5 以及周边插件后，代码需要做出的调整：

- package.json 的 dev-server 命令改了 `"dev": "webpack serve --config build/webpack.dev.js",`
- 升级新版本 `const { merge } = require('webpack-merge')`
- 升级新版本  `const { CleanWebpackPlugin } = require('clean-webpack-plugin')`
- `module.rules` 中 `loader: ['xxx-loader']` 换成 `use: ['xxx-loader']`
- `filename: 'bundle.[contenthash:8].js'` 其中 `h` 小写，不能大写

怎么测试：把 package.json 文件的 dev 和 build 的 webpack 配置文件的路径改下就行
