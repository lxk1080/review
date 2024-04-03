
## Webpack

#### 基本配置和高级配置

1. 演示代码都为 webpack5 版本，webpack5 的发布：https://webpack.docschina.org/blog/2020-10-10-webpack-5-release/

2. webpack 基本配置，参考：/基本配置
    - 拆分配置和 merge，主要用到 webpack-merge，用来提取 webpack 的公共配置
    - 启动本地服务，devServer
    - 处理 ES6，babel-loader
    - 处理样式，postcss-loader、css-loader、style-loader
    - 处理媒体文件（图片），file-loader、url-loader

2. 多入口配置，参考：/多入口配置

3. 抽离 css 文件，主要用于生产环境，关键插件 MiniCssExtractPlugin，用它代替 style-loader。使用 style-loader 处理 css，是通过 js 控制插入 style 标签的，js 控制比较耗性能，模板里看不到，运行时通过 Chrome 调试 Dom 结构才能看到，而用 MiniCssExtractPlugin 是直接插入到模板的 link 标签，使用 href 链接，模板里能看到插入的代码，参考：/抽离压缩css文件

4. 抽离公共代码和第三方代码，主要用于生产环境，如果不做抽离，那每次修改业务代码的时候，公共代码会重复打包在引用它的多个文件，第三方代码虽然能独立生成一个 bundle，但是每次 hash 值会变，对于浏览器而言还是要重新加载。抽离之后，公共代码和第三方代码都提取为一个不变的 bundle，就不需要重复打包和加载了，关键配置：optimization.splitChunks，参考：/抽离公共代码和第三方代码

5. 懒加载（异步加载），异步文件会打包成一个单独的 bundle，参考：/懒加载

    ```js
        // dynamicData 文件
        export const data = {
          message: 'hahaha',
        }
        const defaultValue = 'enenen';
        export default defaultValue;

        // 主要是这种 import 的语法，返回一个 promise
        setTimeout(() => {
          import('./dynamicData').then((res) => {
            console.log(res.data.message);
            console.log(res.default);
          });
        }, 2000);
    ```

6. 处理 JSX，使用 babel-loader，presets 设置为 @babel/preset-react

7. 处理 Vue，使用 vue-loader

8. module、chunk、bundle 的区别，可以参考 webpack 官网首页的图，左中右三个部分就可以理解为这三个概念
    - module：各个源码文件（js、css、png、svg ...）。webpack 中一切皆模块，当然除了 index.html，是个模板，也可以理解为模块，用来展示的
    - chunk：多个模块合并而成的。可以定义 chunk 的方式，例如：entry、splitChunk、import()
    - bundle：最终的输出文件，chunk 可以理解为在内存中，还没出来，最终出来的文件叫 bundle，一个 chunk 对应一个 bundle 文件

#### 优化打包构建速度

1. 优化 babel-loader，一般用于开发环境，生产环境用了也没啥效果

    ```js
        // cacheDirectory 没有改的代码不会重新编译，计入缓存
        {
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory'], // 开启缓存
            include: path.resolve(__dirname, 'src'), // 明确范围
        }
    ```

2. webpack.IgnorePlugin，用于忽略第三方包里面指定目录，让指定目录不被打包进去，可用于开发环境和生产环境

    ```js
        // 例如 moment 日期处理库，里边内置了很多语言
        // 但是我们只需要使用中文，如果其他翻译文件也打包的话文件会很大，也影响性能
        // 通过这个插件就可以忽略掉那些不需要的目录文件
        
        // 在打包 moment 这个库的时候, 将整个 locale 目录都忽略掉
        new webpack.IgnorePlugin(/\.\/locale/, /moment/)
        
        // 这样的话就屏蔽了所有语言包，连中文都用不了了
        // 可以自行导入中文包解决
        import 'moment/locale/zh-cn';
    ```

3. noParse，避免重复打包，可用于开发环境和生产环境

    ```js
        // 防止 webpack 解析那些任何与给定正则表达式相匹配的文件
        // 有的包已经模块化处理过了，没必要再去处理
        module.exports = {
            module: {
                noParse: /jquery|lodash/,
                
                // 或者用函数式的写法
                noParse: (content) => /jquery|lodash/.test(content),
            }
        }
    ```

4. happypack，开启多进程打包，提高构建速度，注意：是进程，不是线程。happypack 可以用于开发环境与生产环境，参考：/多进程打包和压缩

    ```js
        const HappyPack = require('happypack');
        
        // 这里只写了对 js 文件的处理，css 文件也是同样的方式
        // 新建一个 HappyPack 实例，定义不同的 id 和 loaders 即可
        
        module: {
            rules: [
              {
                test: /\.js$/,
                // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
                use: ['happypack/loader?id=babel'],
                include: srcPath,
              },
            ],
        },
        
        plugins: [
            // happyPack 开启多进程打包
            new HappyPack({
              // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
              id: 'babel',
              // 如何处理 .js 文件，用法和 Loader 配置中一样
              loaders: ['babel-loader']
            }),
        ]
    ```

5. webpack-parallel-uglify-plugin，多进程压缩 JS，一般只用在生产环境，开发环境没必要压缩代码，参考：/多进程打包和压缩

    ```js
        const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
    
        // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
        new ParallelUglifyPlugin({
          // 传递给 UglifyJS 的参数
          // Webpack 默认有 UglifyJS 的功能
          // 这个插件还是使用默认的 UglifyJS 压缩，只不过帮助开启了多进程
          uglifyJS: {
            output: {
              beautify: false, // 最紧凑的输出
              comments: false, // 删除所有的注释
            },
            compress: {
              // 删除所有的 `console` 语句，可以兼容ie浏览器
              drop_console: true,
              // 内嵌定义了但是只用到一次的变量，会直接被计算
              // 例如：var a = 10, b = 20; var c = a + b;
              // 打包后：var c = 30;
              collapse_vars: true,
              // 提取出：出现了多次但是没有定义成变量去引用的静态值
              reduce_vars: true,
            }
          }
        })
    ```

6. 关于多进程的使用，如果项目较大，打包较慢，开启多进程能提高速度，如果项目较小，打包很快，开启多进程反而会降低速度（创建进程开销）

7. 自动刷新，watch 和 watchOptions，webpack 自带的文件监听，一般用不到，只要用了 dev-server， 就会默认开启自动刷新，这里了解一下，详情可以去官网

8. 热更新，网页不刷新，状态不丢失，开发环境使用，webpack 配置了之后，css 可以直接热更新生效，但是对于 js，需要手动添加热更新可响应的模块，参考：/热更新

    ```js
        const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
        
        // 修改 entry 方式
        entry: {
            index: [
              'webpack-dev-server/client?http://localhost:8080/',
              'webpack/hot/dev-server',
              path.join(srcPath, 'index.js')
            ],
        },
        
        // devServer 中开启热更新
        devServer: {
            hot: true, // 开启热更新
        }
        
        // 插件中创建实例
        plugins: [
            new HotModuleReplacementPlugin(),
        ]
        
        // 对于 js 文件，需要在文件（一般是 app.js 文件）里面先注册热更新模块
        // 下面的代码表明，只有在修改 math.js 时，才会触发热更新
        if (module.hot) {
            module.hot.accept(['./math'], () => {
              console.log('math.js 文件修改了')
            })
        }
        
        // 如果想全局热更新，只需要写一个总入口文件，或不写参数
        module.hot.accept()
        
        // 注意：热更新不总是好的，也会存在一些问题，热更新时，会把更新的文件内的代码重新再执行一遍
        // 事实上是打乱了本来的执行顺序，例如变量复位问题，全局变量累加问题，Dom 节点更新问题
        // 例如 document.body.append('123')，本来代码只执行一次，热更新后，又会再 append 一次，导致节点无故增多
    ```

9. DllPlugin，动态链接库插件，用于开发环境（DllPlugin解决的是打包的速度），提高构建速度，例如前端框架 Vue、React，体积大，构建慢，但是它们比较稳定不变，构建一次即可，不用每次都重新构建，主要有两个插件：DllPlugin（打包出 dll 文件）、DllReferencePlugin（使用 dll 文件），用的时候还需要在 index.html 里引入 dll.js 文件。参考：/动态链接库插件Dllplugin，使用 `npm run dev-dll` 测试代码

#### 优化产出代码

1. 小图片 base64 编码，减少网络请求，参考：/基本配置/webpack.prod.js

2. bundle 加 hash，利用浏览器缓存，参考：/基本配置/webpack.prod.js

3. 懒加载，参考上面的：基本配置和高级配置/6

4. 提取公共代码，splitChunks，参考：/抽离公共代码和第三方代码

5. IngorePlugin，打包时忽略掉用不到的文件，参考上面的：优化打包构建速度/2

6. 使用 CDN 加速，`publicPath: 'http://cdn.abc.com'`，可以在 output 中和解析图片时使用，参考：/基本配置/webpack.prod.js

7. production
    - 自动开启代码压缩
    - Vue、React 等会自动删掉调试代码（如开发环境的 warning）
    - 启动 Tree-shaking（摇树，把枯叶给摇掉~），删掉无用的代码
        - 只能生效于 ES6 import 的方式，commonJS 不行
            - ES6 module，静态引入，编译时引入，只能写在外面，不能用任何条件判断是否引入，否则会报错
            - CommonJS，动态引入，执行时引入，可以在 if 语句内 require
            - Tree-Shaking 依赖于静态分析
        - 配合属性：sideEffects
            - 如果所有代码都不包含副作用，我们就可以简单地将该属性标记为 false，来告知 webpack 它可以安全地删除未用到的 export
            - "副作用" 的定义是：在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。举例说明，例如 polyfill，它通常不提供 export，但它影响全局作用域，因此 polyfill 将被视为一个副作用
            - 如果某些代码确实存在一些副作用，可以将 sideEffects 指定为一个数组：`"sideEffects": ["./src/utils/myPolyfill.js"]`，这样的话，即使此代码没有被 import 使用到，webpack 打包时也不会删除此代码
            - 参考：https://webpack.docschina.org/guides/tree-shaking/#clarifying-tree-shaking-and-sideeffects

8. Scope Hoisting，作用域提升，webpack 打包，默认每个 module 都会打包成一个闭包函数，而使用 Scope Hoisting，可以让多个函数合并成一个函数，这样可以减小代码体积，创建的函数作用域更少，开销随之变小，代码的执行速度更快。注意：要使 Scope Hoisting 生效，代码必须是用 ES6 Module 写的

    ```js
        const ModuleConCatenationPlugin = require('webpack/lib/optimize/ModuleConCatenationPlugin')
        
        module.exports = {
            resolve: {
                // 针对 npm 中的第三方模块，优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
                mainFields: ['jsnext:main', 'browser', 'main']
            },
            plugins: [
                // 开启 Scope Hoisting，主要是这一句
                // 上面的 mainFields，目的是优先使用 ES6 Module 的库
                new ModuleConCatenationPlugin(),
            ],
        }
    ```

9. 关于 babel
    - 配置文件 `.babelrc`
        - plugins：一系列的插件，用来解析语法
        - presets：很多 plugin 的集合，作为预设

    - babel 只关心语法，不关心是否支持 api（例如：`Promise、.includes`），只要符合 ES5 语法规范，即使 api 不支持，babel 也不管，所以需要 babel-polyfill 的 api 支持（polyfill 的本质就是补丁，去实现这个 api），同时 babel 也不处理模块化，引入进来的 polyfill，还需要配合 webpack（node 环境）去处理

    - babel-polyfill，是 core-js 和 regenerator 的集合
        - regenerator，对 generator 语法的 polyfill
        - core-js，对其他语法的 polyfill
        - babel-polyfill 在 babel 7.4 之后被弃用，推荐直接使用 core-js 和 regenerator
        - babel-polyfill，直接引入的话，文件很大，只需要引入用到的部分，可配置按需引入

            ```js
                // 如果在文件中 import '@babel/polyfill'，引入的文件将会很大，所以不要在文件中直接引入
                // 进行以下配置，即可实现按需引入，只引入用到的部分，打包时会自动引入用到过的模块
                {
                    "presets": [
                        [
                            "@babel/preset-env",
                            {
                                "useBuiltIns": "usage",
                                "corejs": 3
                            }
                        ]
                    ],
                    "plugins": [
                        
                    ]
                }
            ```

    - babel-runtime
        - babel-polyfill 会污染全局环境，babel-runtime 则不会
            - babel-runtime 把原生的 api 改成自己任意起的名了，不会影响原来的，例如 Promise，会补丁成 `_promise = () => { ... }`，在编译代码的时候，也会编译成 `_promise.then(() => { ... })`，这样的话就不会影响 Promise 的值了
        - 开发应用，用 babel-polyfill
        - 开发第三方库，用 babel-runtime












<br/><br/><br/><br/><br/>
