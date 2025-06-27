
# RR

> review record，对应 review 里的 reviewNotes，以 cloud
更新为主，reviewNotes 仅仅作为只读文件，其它相同类型的 md 文件同理

## html

1. 理解语义化

    - 让人更容易读懂（增加代码可读性）
    - 让搜索引擎更容易读懂（SEO）

## css

1. 盒模型，border-box、content-box

2. 纵向边距会重叠，空白元素会隐藏（加了特殊的css属性除外）

3. 一般文档流下，margin 四方向负值会出现情况：
    - margin-left: 自身左移
    - margin-right: 右侧元素左移，在外界看来，目标元素的宽度变小了（宽度占的地方更少了，如果 margin-right 为负的自身宽度，则此元素在宽度上不占空间）
    - margin-top: 自身上移
    - margin-bottom: 下方元素上移，与 margin-right 同理

4. BFC (Block format context)，块级格式化上下文
    - BFC 原理（渲染规则）
        - BFC 是一个独立的容器，它外面的元素不会影响里面的，反之亦然
        - BFC 元素内的垂直方向会发生边距重叠
        - BFC 不会与浮动的元素重叠
        - BFC 元素计算高度时，子元素即使是 float 也会参与计算
    - 如何创建 BFC
        - float 不为 none
        - overflow 不为 visible
        - position 的值为 absolute 或 fixed
        - display 属性为 inline-block、table-[x] 系列、flex、grid 等等

5. 圣杯布局和双飞翼布局的目的：
    - 三栏布局，中间一栏最新加载或渲染（内容为重）
    - 两侧内容固定，中间内容随着宽度自适应
    - 一般都是 PC 网页

6. 圣杯布局和双飞翼布局的异同点：
    - 都是使用 float 左浮动，左右都用到了 margin 复位
    - 圣杯布局使用 padding 为左右腾出空间，左右使用 margin 复位，左边还需要用到定位 position
    - 双飞翼布局使用 margin 为左右腾出空间，但中间内容需要内嵌一个元素，左右只需要用 margin 复位，相对圣杯布局简单些

7. 清除浮动：clearfix 了解一下，clearfix 加在浮动元素的父元素上

8. flex 布局

9. 元素水平垂直居中

10. line-height 的继承问题：
    - 如果 line-height 为 20px，子元素直接继承大小，如果是 200%、1.5em 这种，则行高直接继承根据父元素的 font-size 算出来的值，如果是 1、1.5 这种，则子元素继承这个倍数，行高依据自身的属性计算。

11. 响应式相关，了解一下：
    - 以根元素（html）的 font-size 大小来相对布局的 rem 和 media query 的配合使用
    - vw，window.innerWidth = 100vw
    - vh，window.innerHeight = 100vh
    - vmax = Math.max(1vw, 1vh)
    - vmin = Math.min(1vw, 1vh)

## js

1. typeof 能识别哪些类型

    - 所有值类型（number、string、boolean、undefined、symbol、bigint）
        - null 的话，不好说，比较特殊
    - 函数（funtion）
    - 引用类型（object）

- 关于类型转换：

    ```
    显式类型转换：
        - Number()
            - 原始类型
                - 数值：还是数值
                - 字符串：如果是字符串数字，得到相应的数值，空字符串转为 0，其他 NaN
                - 布尔值：true --> 1, false --> 0
                - null：0
                - undefined：NaN
                - symbol: 报错
            - 引用类型（复合类型）
                - 首先 obj.valueOf()
                    - 返回原始类型 --> Number()
                    - 返回复合类型 --> obj.toString()
                        - 返回原始类型 --> Number()
                        - 返回复合类型 --> 报错
        - String()
            - 原始类型
                - 将任何原始类型的值加上字符串
            - 引用类型（复合类型）
                - 首先 obj.toString()
                    - 返回原始类型 --> String()
                    - 返回复合类型 --> obj.valueOf()
                        - 返回原始类型 --> String()
                        - 返回复合类型 --> 报错
    隐式类型转换：
        - 四则运算
        - 判断语句
        - Native调用，例如：console.log()、alert()
    ```

2. 深拷贝（能写出来是那意思就行，写不了真正的深拷贝）

3. 运算符，关于 ==，<span style="color: red">除了 == null，其它地方全都用 ===</span>，x == null，就相当于 x === null || x === undefined。

4. falsely 变量，除了以下几种，全都是 truly 变量
    - null
    - undefined
    - 0
    - NaN
    - ''
    - false

5. && 和 || 运算符返回值：或真与假

6. 面向对象
    - 创建对象的几种方法
        - 字面量
        - 构造函数
        - Object.create()
    - 模拟 new 运算符，假设有构造函数 foo，const o = new foo()
        - 一个新对象被创建（空对象），他继承自 foo.prototype
        - 构造函数被执行，可以传递参数，同时（this）上下文指向了新对象
        - 如果构造函数执行后返回了一个对象，则最终返回这个对象，否则返回新建的这个对象

7. 原型链，参见文件：【图】原型链.png，js 文件夹也有代码。class 中继承的原理就是通过原型链，实例中没有的属性和方法就是通过 &#95;&#95;proto&#95;&#95; 一层一层的往上找的。

8. 表达式中 instanceof 的判断规则为：顺着原型链向上逐级查找，只要能找到对应的原型，都为 true。

    - 注意：这句话只适用于引用类型，<span style="color: red">字面量创建的</span>基本类型不适用（虽然字面量创建的基本类型能通过 `__proto__` 找到其对应的原型），像数字 123、字符串 qwer、布尔值 true，这些都不是 Number、String、Boolean 的实例，像 null 和 undefined 是没有 `__proto__` 属性的，更不是任何对象的实例。

9. 作用域和闭包，关键的一句：自由变量的查找是在函数定义时，不是在执行时。

10. 关于 this，this 的指向是在函数执行时确定的，不是定义时，使用箭头函数可以使 this 的取值指向定义时的上级作用域。

11. 手写 bind 函数，可以了解一下

12. 事件循环（Event Loop），可参考 【图】Event Loop.png。
    - 同步代码，一行一行放到 Call Stack 执行
    - 遇到异步，会先“记录”下（由某个JS模块或浏览器模块处理），等待时机（Promise、定时、网络请求等）
    - 时机到了，微任务移动到 Micro Task Queue，宏任务移动到 Callback Queue
    - 如果 Call Stack 为空（同步代码执行完），先执行微任务，再尝试 Dom 渲染（如果 Dom 结构已更新，则触发渲染），最后执行宏任务
    - 需要注意的是，宏任务每执行完一个，就会立即去检查是否有微任务。如果有，则先执行完所有的微任务，然后再执行下一个宏任务。如果没有，则直接执行下一个宏任务
    - 所有宏任务都执行完后，继续事件循环（Event Loop）
        - 轮询查找 CallBack Queue，如有任务，则移动到 Call Stack 执行，循环以上步骤
    - 最后来理解一下：
        - 万变不离其宗的顺序：**同步 => 微任务 => 宏任务**
        - 为什么宏任务每执行完一个就去检查微任务？
            - 宏任务执行时，是把代码放入到同步队列执行的，而同步代码执行完干嘛？是去执行微任务。而微任务的代码同样是放到同步队列执行的，同步执行完后，又去执行微任务，所以是所有微任务都执行完了，再去执行宏任务，然后宏任务中的代码放入同步队列，继续上面的步骤，形成了一个循环

13. 宏任务（macroTask）和微任务（microTask）
    - 宏任务：setTimeout、setInterval、Ajax、Dom事件。一般是与浏览器相关的。
        - 浏览器规定的，调用浏览器的处理模块，等待时机进入 Callback Queue
    - 微任务: Promise、async/await。一般是与 js 本身相关的。
        - ES6 语法规定的，调用 JS 引擎的处理模块，等待时机进入 Micro Task Queue
    - 微任务执行时机比宏任务要早
    - 微任务在 Dom 渲染前触发，宏任务在 Dom 渲染后触发
    - 宏任务每执行完一个后，就会检查是否有微任务，如果有，则执行微任务，如果没有，则继续执行宏任务
    - 可能是因为微任务是由 js 引擎执行的，所以 js 引擎在执行完同步任务后就顺便把微任务给做了，而如果先调用浏览器的 API，再回过头来调用 js 引擎执行微任务，这样就比较麻烦，效率低，所以就有了微任务比宏任务先执行之设计

14. Dom 事件也是基于 Event Loop 机制实现的，可以这么理解，代码执行到 setTimeout 这一句时 ，进入了浏览器的计时模块，由计时模块计算触发时间并将回调函数放到 Callback Queue，而执行到 Dom 事件绑定时，调用了浏览器的事件模块，当我们点击时，事件模块将回调函数放到 Callback Queue，最后当 Call Stack 为空时，由 Event Loop 将这些函数放到 Call Stack 执行。

15. 关于 Promise 的状态以及链用机制
    - Promise 函数本身是立即执行的，它不是异步的，它只是用来处理异步代码
    - Promise 三种状态，pendding、resolved、rejected
    - resolved 状态触发 then
    - rejected 状态触发 catch
    - then 和 catch 正常情况下返回 resolved 状态，遇到报错则返回 rejected 状态（很重要！），然后再由这个状态决定触发 then 或者 catch
    - 当 then 里面 return 一个 Promise 时，可以这么理解：下一个 then 或 catch 就会变成这个 Promise 的 then 和 catch，然后规则同上
    - 当 then 里面 return 一个普通的字符串或数字时（其实是隐式的将字符串或数字转化成了 Promise），下一个 then 中接收的就是这个字符串或数字，没有 return 的话，则是 undefined

16. 关于 Promise 的异步调用
    - 首先我们需要知道 Promise 的异步和 setTimeout 的异步在写法上是有区别的
        - setTimeout 写起来是一体的，有回调函数，有延时时间，时间到了之后，由处理模块将回调函数放入宏任务队列等待执行
        - Promise 中的 resolve 和 reject 就相当于 setTimeout 中的延时时间触发，但是 promise 不需要立即定义回调函数
    - 也就是说，当 Promise 触发 resolve 后，如果下面的代码紧接着给了 then 回调，那么这个回调函数会被立即放进微任务队列
    - 但是，如果下面没有给出 then 回调，那么，哪个地方定义了 then 回调，就在哪个地方把回调函数放进去，这也就意味着，即使你 resolve 的时间最早，但是把 then 写在最后，那么触发 then 回调也会是在最后，因为这个回调函数是最后才加进微任务队列的
    - 总结一下：
        - 代码执行过程中，如果我们遇到 then 回调，有两种情况：
            - 已经 resolve 过了（或者说已经不是 pedding 状态了，这里是为了方便理解），直接将回调加入到微任务队列中
            - 还没有 resolve 过（还在 pedding 中），需要等到 promise 在 resolve 的时候，再将回调函数加入到微任务队列中
        - 不过一般来讲，我们实际使用中，应该不会遇到这种问题，因为把 Promise 和回调分开写没有任何意义（我们就是要达到状态一改变就尽快执行回调函数的效果，要不然要回调干啥？），主要是为了解决一些奇葩的面试题目，例如：在 Promise 里面再写了 Promise，然后里面的 Promise 先 resolve，外层 Promise 后 resolve，让你说说执行顺序。这种题目就毫无意义，可以说是本末倒置，Promise 设计出来就是让你链式调用，让代码可读性更好，这面试题目倒好，直接搞成嵌套回调地狱，可以说是逆向发展了。虽然我对这种面试题目没什么好感，但是 Promise 的异步我们依然是要弄清楚的

17. Promise 中 resolve 和 reject 的使用场景？
    - 一般来讲，使用场景大致分以下三种情况：
        - 1、调用者只要结果，不关心你有没有错（resolve）
        - 2、调用者关心你有没有错，但是不关心你为什么错（resolve + reject）
        - 3、调用者关心你有没有错，还关心你为什么错（也是 resolve + reject）
    - 单独使用 Promise.resolve() 没问题，但是 Promise.reject() 会报未捕获异常
    - 只要使用了 reject，后续必须要加 catch 处理，否则会报异常，说你不捕获：Uncaught (in promise)，后面同级代码会停止执行，但是并不会中断整个程序的运行
    - 所以 reject 的作用：
        - 向后传递异常信息，以供在不同场景使用时可以输出不同的信息（对应上面的情况 2 ）
        - 一个方法内可能有多个位置会 reject，那么可以在外层精准捕获错误信息（对应上面的情况 3 ）
    - 事实上，可以完全不使用 reject 只使用 resolve，resolve 和 reject 分别会导向 then 和 catch，这种设计，可能是为了让代码看起来更加优雅吧。当然了，catch() 函数还是很重要的，可以直接捕获上游的执行错误，catch 和 reject 是独立的，只不过 catch 也可以为 reject 所用而已，不要把 catch 和 reject 混为一谈

18. async/await 和 Promise 的关系
    - 执行 async 函数，返回的是 Promise 对象
    - await 相当于 Promise 的 then，处理不了 rejected 状态
    - try...catch 可捕获异常，代替了 Promise 的 catch

19. 关于异步写法的发展和一些思考
    - 解决异步回调的嵌套问题，callback hell
    - 提出 Promise，链式调用，但也是基于回调函数
    - 再提出 async/await，用同步语法写异步代码，彻底消灭回调函数
    - async/await 和 Promise 并不互斥，通常是配合使用，相辅相成
    - js 是单线程的，异步总归是是基于 event loop 的
    - 异步的本质还是回调函数， async/await 只是语法糖，但是很香！

## Dom

1. Dom 的数据结构？树

2. property（点调用的形式） 和 attribute（setAttribute、getAttribute） 的区别？
    - property 只能修改 dom 对象已有的属性
    - attribute 可以增删改查任意已有或自定义属性

3. dom 操作性能优化
    - dom 查询做缓存（尤其是 for 循环的时候）
    - 将频繁操作改为一次性操作（先用文档片段打包）

4. 获取盒模型的宽高
    - `el.style.width`（只能取到内联的样式）
    - `window.getComputedStyle(el).width` （兼容谷歌、火狐）
    - `el.getBoundingClientRect().width`（获取宽高以及元素的各个边到视窗左上的距离）
    - `el.currentStyle.width`（只有IE支持）

5. 事件委托（冒泡机制），通用的事件绑定函数

6. dom 事件流，事件通过捕获到达目标元素，再从目标元素冒泡到window对象
    - 捕获（window --> document --> html --> body --> ... --> 目标元素）
    - 目标阶段
    - 冒泡

7. event 对象的常见使用
```
    event.preventDefault() // 阻止默认行为
    event.stopPropagation() // 阻止冒泡
    event.stopImmediatePropagation() // 事件响应优先级（例如为一个DOM元素绑定两个响应函数，那么在一个响应函数中使用该方法可以阻止其他的响应函数）
    event.currentTarget // 通过事件代理（事件委托）方式绑定事件的情况，可以得到用作事件代理的父级元素
    event.target // 当前被点击的元素
```

8. 自定义事件，可以参考 utils 里有通用的 fireEvent 方法

9. 网页是如何展示出来的？
    - 加载了哪些资源？
        - html、js、css、媒体文件（图片、视频）

    - 加载资源的过程
        - DNS 解析：域名 --> IP 地址。为啥要用域名？
            - 域名更容易记
            - IP 地址在不同区域有可能是不一样。有的网站为了提高网页的访问速度，在不同区域做了代理
            - 解析的基本过程：先到主机的 host 文件查找有没有对应的 域名 ip，如果没有，再去 DNS 服务器查询，服务器返回对应的 ip 地址
        - 浏览器根据 IP 地址向服务器发起 http 请求
        - 服务器处理 http 请求，返回数据给浏览器
    - 渲染过程
        - 根据 HTML 代码生成 Dom Tree
        - 根据 CSS 代码生成 CSSOM（css object model）
        - 将 Dom Tree 和 CSSOM 整合形成 Render Tree（过程中通过 Layout 计算出各个元素的位置、颜色、宽高等）
        - 根据 Render Tree 渲染页面
        - 遇到 \<script\>/css 则暂停渲染，优先加载并执行 js/css 代码，完成后继续
        - 直至把 Render Tree 渲染完成

10. load 和 DomContentLoaded 的区别？
    - load，页面所有资源（包括媒体文件）全部加载完才会执行
    - DomContentLoaded，Dom 渲染完成即可执行，此时图片、视频可能还没加载完

11. 什么是 DOCTYPE 及作用
    - DTD 告诉浏览器文本类型，浏览器根据这个判断该用何种协议来解析
    - DOCTYPE 用来声明文档类型和 DTD 规范，用途是进行 --> 文件的合法性验证
    - HTML5 <!DOCTYPE html>

12. 重排 Reflow
    - 概念：DOM结构中各个元素都有自己的盒子，浏览器根据各种样式计算并根据计算结果将元素放到它该出现的位置
    - 白话：浏览器把dom结构中的各个元素放到它应该出现的位置的这么一个过程
    - 触发 reflow
        - 增加、删除、修改 dom 节点
        - 移动 dom 位置时，例如动画
        - 修改 css 样式，例如宽高改变、display改变
        - Resize 窗口或滚动时有可能触发
        - 修改网页的默认字体时

13. 重绘 Repaint
    - 白话：将页面要呈现的内容绘制在屏幕上
    - 触发 repaint
        - DOM 改动
        - CSS 改动

## Bom

1. navigator
    - userAgent （识别浏览器类型）

2. screen（屏幕信息）

3. location
    - protocol，协议
    - host，域名
    - port，端口
    - pathname，路径
    - search，参数
    - hash，哈希值

4. history
    - forward，网页前进
    - back，网页后退

## 通信

1. 同源策略
    - 源：协议 + 域名 + 端口号
    - 源 a 的脚本不能获取源 b 的资源（cookie、dom、ajax）
    - WebSocket 不受同源策略限制

2. ajax 的两个判断状态
    - xhr.readyState
        - 0 还没调用 send 方法（未初始化）
        - 1 调用了 send 方法，正在发送请求（载入）
        - 2 send 方法执行完成，接收到了响应内容（载入完成）
        - 3 正在解析响应内容（交互）
        - 4 解析完成，可以在客户端调用（完成）
    - xhr.status
        - 就是 http 的状态码，http 会详细说

3. 跨域
    - jsonp
        - 利用 script 标签没有跨域的限制，使用 callback 传输数据
        - jsonp 的原理就是请求一段 js 脚本，脚本内容为执行一个函数，我们在浏览器端提前定义好这个函数即可
        - 注：jsonp 由于使用 script 标签，所以它请求的返回内容都视为 js 脚本，可以直接在浏览器上执行
    - CORS，W3C标准，全称"跨域资源共享"（Cross-origin resource sharing）
        - 整个 CORS 通信过程，都是浏览器自动完成。对于前端开发者来说，CORS 通信与同源的 AJAX 通信没有差别，代码完全一样。浏览器一旦发现 AJAX 请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。
        - 实现 CORS 通信的关键是服务器，要设置响应头。
        - 具体可参考：https://www.ruanyifeng.com/blog/2016/04/cors.html
    - Hash（Hash改变，页面不刷新，iframe页面间跨域，只能传递一些小数据）
    - postMessage（H5增加，iframe页面间跨域，可以传递复杂数据）
    - WebSocket（服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息）

## 存储

1. cookie
    - 背景：
        - 本身用于浏览器和服务器的通讯
        - 被借用到本地存储来
    - 缺点
        - 最大 4KB
        - http 请求每次携带，增加了请求数据量
        - 只能用 document.cookie = '...' 修改，简陋且不方便

2. localStorage 和 sessionStorage
    - H5 专为前端存储而设计，最大 5M
    - localStorage 永久存储，浏览器关闭也不会消失，除非手动删除
    - sessionStorage，临时存储，tab 页面关闭就会被清除

## http

1. http 协议和规范，就是个约定，要求大家都这么做，保证兼容性，当然也可以不遵守，例如 IE 浏览器没遵守这个规范，就逐渐被历史所淘汰

2. http 状态码
    - 1xx，服务器收到请求，但没返回
    - 2xx，请求成功
    - 3xx，重定向
    - 4xx，客户端错误
    - 5xx，服务端错误

3. 常见状态码
    - 200，成功
    - 301，永久重定向，响应头中返回 location，浏览器自动访问新的 url
        - 假如说访问 A 返回 301，则重定向到 B，那浏览器下次访问 A 的时候，就直接去 B
        - 例如：域名更换，访问老域名的时候重定向到新域名，浏览器记住这个信息，下次访问老域名时，直接去新域名
    - 302，临时重定向，响应数据和浏览器行为与 301 相同
        - 假如说访问 A 返回 302，则重定向到 B，那浏览器下次访问 A 的时候，还是去 A，看看有没有新的状态码，如果状态码还是 302，那照样去 B，不过下次访问时，依然去 A
    - 304，资源未被修改
    - 403，没有权限
    - 404，资源没找到
    - 500，服务器错误
    - 504，处理超时

4. restful API，一种 API 设计规范
    - 传统的 API，把每一个 url 当作一个功能
        - 传统方式更像是一个函数，传递参数
        - get 获取数据，/api/list?pageIndex=2
        - post
            - 提交数据，/api/create
            - 更新数据，/api/update?id=2
            - 删除数据，/api/delete?id=2

    - Restful API，把每一个 url 当作一个唯一的资源
        - 唯一的资源标识，不要用任何动词
        - get 获取数据，/api/list/2
        - post 增加数据，/api/list
        - patch/put 更新数据，/api/list/2
        - delete 删除数据，/api/list/2

    - 有什么优点？
        - 轻量，简洁，更符合 http 协议和规范
        - 具有自解释性，面向资源，清晰易懂
        - 兼容各大客户端平台（PC、IOS、Android）

5. http headers
    - http 协议是建立在 TCP/IP 基础上
        - http 1.0 为短连接，发送完数据就断掉
        - http 1.1 为长连接，持续时间大概 30s

    - Request Headers
        - Accept 浏览器可接收的数据格式，text/html、image/webp
        - Accept-Encoding 浏览器可接收的压缩算法，gzip、compress
        - Accept-Language 浏览器可接收的语言，zh-CN
        - Connection 连接类型，长连接或短连接，keep-alive / close
        - Cookie 请求信息，key1=value1; key2=value2
        - Host 域名，`www.baidu.com`
        - User-Agent 浏览器信息（简称UA），Mozilla/5.0 ...
        - Content-Type 发送数据的格式，application/json
        - Referer 告诉服务器，请求来自哪里，常用于防盗链
        - If-Modified-Since 协商缓存的时间标识
        - If-None-Match 协商缓存的 Etag 标识

    - Response Headers
        - Content-Type 返回的数据格式，application/json
        - Content-Length 返回数据的大小，多少字节，180
        - Content-Encoding 返回数据的压缩算法，gzip
        - Set-Cookie 服务器端通过浏览器要设置的 Cookie，key=value
        - Location 重定向的 url，`http://www.baidu.org/index.jsp`
        - Server 服务器的类型，apache、tomcat、BWS/1.1
        - Cache-Control 告诉浏览器如何缓存（强制缓存）
        - Expires 告诉客户端该响应数据会在指定的时间过期
        - Last-Modified 协商缓存的时间标识，资源的上次更新时间
        - Etag 协商缓存的资源标识
        - Content-Disposition 告诉浏览器，有文件下载，attachment; filename=aaa.zip
        - Date 响应数据生成的时间，服务器时间，可能和本地时间不同

6. get 和 post 的区别
    - GET 参数通过 URL 传递，POST 放在 Request body 中
    - GET 请求在 URL 中传送的参数是有长度限制的，而 POST 没有
    - GET 比 POST 更不安全，因为参数直接暴露在 URL 上，所以不能用来传递敏感信息
    - GET 在浏览器回退时是无害的，而 POST 会再次提交请求（回退）
    - GET 产生的 URL 地址可以被收藏，而 POST 不可以（收藏）
    - GET 请求会被浏览器主动缓存，而 POST 不会，除非手动设置（缓存）
    - GET 请求参数会被完整保留在浏览器历史记录里，而 POST 中的参数不会被保留（历史记录）
    - GET 请求只能进行 URL 编码，而 POST 支持多种编码方式
    - 对参数的数据类型，GET 只接受 ASCII 字符，而 POST 没有限制

7. 缓存
    - 什么是缓存？
        - 将服务器端返回的某些资源存储在浏览器端
    - 为什么缓存？
        - 优化页面性能，让页面加载更快
    - 哪些资源可以被缓存？
        - 一般是静态资源（js、css、img）
    - 强制缓存，可参考【图】强制缓存.png
        - Cache-Control，在 Response Header 中，由服务器端控制强制缓存的逻辑
            - max-age，缓存有效时间，单位：秒，再次请求先判断资源是否在有效期内
            - no-cache，不用强制缓存，服务器缓不缓存（协商缓存）浏览器不管
            - no-store，不用强制缓存，也不让服务器端缓存
            - private，资源仅仅只能被获取它的浏览器端缓存，不允许任何中间者（代理服务器、cdn）缓存响应的资源
            - public，允许被任何中间者缓存，通常用不到，因为其他指令已经表明了资源是否可被缓存，例如 max-age 允许中间者被缓存
        - 关于 Expires，也在 Response Header 中，也是控制缓存有效期的，但是被 Cache-Control 代替，可以和 Cache-Control 同时存在，但是以 Cache-Control 为准，Expires 使用的是服务器的绝对时间，可能与客户端的时间不一致
    - 协商缓存（对比缓存），可参考【图】协商缓存.png
        - 资源标识，在 Response Headers 中，有两种
            - Last-Modified，资源的最后修改时间。请求头是 if-Modified-Since。参考【图】Last-Modified.png
            - Etag，资源的唯一标识，一个唯一的字符串，生成逻辑没有规定。请求头是 if-None-Match。参考【图】Etag.png
        - Last-Modified 和 Etag，共存时，会优先使用 Etag
            - Last-Modified 只能精确到秒，1s 之内会判断失误
            - 如果资源被重复生成，而内容不变，Etag 更精确
    - http 缓存总结，参考【图】http-缓存.png
    - 刷新操作对缓存的影响
        - 正常操作（地址栏输入url、跳转链接、前进后退）：强制缓存有效，协商缓存有效
        - 手动刷新（F5、点击刷新、右键刷新）：强制缓存失效，协商缓存有效
        - 强制刷新（ctrl + F5）：强制缓存失效，协商缓存失效

## 性能

1. 让加载更快
    - 减少资源体积：压缩代码
        - webpack 打包，图片压缩
    - 减少访问次数：
        - 合并代码：多个 js 文件合并成一个、css 雪碧图
        - http 缓存：js 静态文件，webpack 打包时的 hash 值，只要内容不变，hash 就不变，url 就不变，就能触发 http 缓存机制，返回 304
        - SSR 服务器端渲染：将网页和数据一起加载，一起渲染
    - 使用更快的网络：CDN（内容分发网络）
        - 专门为静态文件服务，将源站内容分发至最接近用户的节点，使用户可就近取得所需内容，提高用户访问速度和成功率，访问的文件，也是符合 304 缓存机制的
    - DNS 预解析
        - `<link rel="dns-prefetch" href="//www.baidu.com">`
        - `<link rel="dns-prefetch" href="//www.bilibili.com">`
        - 许多浏览器对于页面的 a 标签是默认打开 dns 预解析的，但是对于 https 开头的 url 默认是关闭的，下面一句是强制打开 a 标签 dns 预解析，可以设置 content 为 off，让默认的预解析关闭
        - `<meta http-equiv="x-dns-prefetch-control" content="on" />`

2. 让渲染更快
    - CSS 放在 head，JS 放在 body 最下面
    - 尽早开始执行 JS，用 DomContentLoaded 触发
    - 懒加载
    - 对 Dom 查询进行缓存
    - 频繁的 Dom 操作，合并到一起操作（主要用到文档片段 API createDocumentFragment）
    - 节流（throttle）防抖（debounce）函数

## 安全

1. XSS（Cross-site scripting），跨站脚本攻击，向页面注入脚本，例如在评论框注入 script 标签等
    - 例如：
        - 一个博客网站，我发表一篇博客，其中嵌入 \<script\> 脚本
        - 脚本内容：获取 cookie，发送到我自己的服务器（服务器配合接受跨域请求）
        - 有人查看的话，我轻松收割访问者的 cookie 信息
    - 防御措施：
        - 编码转义，对敏感字符转义处理，例如 < > / --> $lt; $gt; ...

2. XSRF/CSRF（Cross-site request forgery），跨站请求伪造
    - 例如：
        - 你在购物，看中了某个商品，商品 id 是 100
        - 付费接口，`xxx.com/pay?id=100`，没有任何验证措施
        - 此时我看中一个商品，id 是 200
        - 我给你发了电子邮件，邮件里隐藏着 `<img src=xxx.com?pay?id=200 />`
        - 你一查看邮件，就自动买了 id 是 200 的商品
        - 我主要是刷销量
    - 原理：
        - 用户在此网站登录认证过，个人信息依然有效
        - 网站接口存在漏洞
    - 防御措施：
        - 密码、指纹、短信验证码
        - Token 认证

3. ClickJacking，点击劫持，视觉欺骗
    - 攻击类型：
        - 攻击者使用一个透明的 iframe 覆盖在网页上，然后诱使用户在该页面上进行操作，用户在不知情的情况下点击透明的 iframe 页面
        - 攻击者使用一张图片覆盖在网页，遮挡网页原有位置的含义
    - 防御措施：
        - 使用http头：X-Frame-Options: DENY，浏览器会拒绝当前页面加载任何 frame 页面
        - 过滤用户提交文本中的敏感标签，如 img

## algorithm

1. 排序
2. 堆栈、队列、链表
3. 递归
4. 波兰式和逆波兰式

## mvvm

1. 双向绑定
    - defineProperty
    - /js/双向绑定js核心api.js
2. 设计模式
    - 观察者模式
    - /js/观察者模式(双向绑定核心设计模式).html
3. 生命周期
    - /【图】/vue生命周期.jpg
    - /js/vue生命周期.html
    - /resource/vue/详解vue生命周期.html
4. 源码分析
    - data：要监听的对象
    - Observer：监听器
    - dep：订阅者列表，存储着 watcher 对象，对应着 data 对象某一个 key 值（每个 key 值有着独立的 dep 对象）
    - watcher：订阅者对象
    - 流程：Observer 监听着 data 对象，data 对象发生改变时，Observer 通知 dep 对象，dep 遍历自身所有的 watcher，告诉 watcher，data 对象发生了改变，watcher 得到了消息后，调用自身的更新函数，以获得 data 对象更新后的数据
    - 编译：
        - 先将所有节点转化为 dom 片段（documentFragment），在 dom 片段中编译模板（vue指令、事件、表达式...），再将编译好的 html 一次性挂载到真正的 dom 上
        - 在编译过程中如果遇到 data 对象中监听的属性，则会实例化一个 watcher 对象，实例化过程中会将此对象添加到该属性对应的 watcher 列表（dep）中，以后该属性的值改变时，此 watcher 对象会得到通知并进行 dom 的更新
        - 参见：/mvvm

## tools

1. Git，参考文件《 Git record.md 》

2. Chrome 调试工具，自由了解，大部分都是经验堆出来的

3. Webpack，另看

4. Linux，有个 vimtutor 挺有意思

## other

1. `parseInt('s', x)`，将 x 进制的字符串 s 转化为 10 进制的数字

2. `n.toString(x)`，将 10 进制的数字 n 转化为 x 进制的字符串

3. 关于 `Object.create()`，可理解为继承

```
    const a = Object.create(null); // 表示什么都不继承，a.__proto__ = undefined
    
    const obj = { x: 1 };
    const b = Object.create(obj); // b 是个空对象，继承自 obj 对象，b.__proto__ = obj
```

4. `new Object({})` 和直接定义 `{}` 的效果是一样的

```
    const a = { x: 1 };
    const b = new Object(a);
    
    console.log(a === b); // true
```

5. for 循环中的作用域

```js
    let i;
    for (i = 1; i <= 3; i++) {
      setTimeout(function () {
        console.log(i);
      }, 0)
    }
    
    // 结果是 4 4 4
    // 只有把 let 写到 for 循环里面才能打出 1 2 3
    // 可能在 for 循环的内部执行机制里，每次执行到 {} 内时，都有一个 let i，这时的 i 是块级的
    // 而在 for 循环外面写的 let i 是全局的
```

6. 关于作用域，我还有话要说

```js
    // 用 let
    const a = 100;
    function test() {
      console.log(a); // a is not defined
      let a = 10;
    }
    test();
    
    // 用 var
    const a = 100;
    function test() {
      console.log(a); // undefined
      var a = 10;
    }
    test();
    
    // 函数内不定义 a
    const a = 100;
    function test() {
      console.log(a); // 100
    }
    test();

    // 在执行 console.log(a) 的时候，会先在当前作用域内寻找 a，即使 a 是在执行语句之后定义的。
    // 用 let 时，由于 a 在后面定义，所以执行的时候，a is not defined。
    // 用 var 的时候，由于有变量提升，相当于在 log 语句前有个 var a; 但还没赋值，所以结果是 undefined。
    // 而最后函数内不定义 a，那就直接在上级作用域寻找 a，所以打出 100
```

7. 错误监控，参考文件：/js/错误监控.html

8. requestAnimationFrame(animate)，传入一个动画函数，让其每秒 60 帧执行，以达到最流畅的程度

9. 当采用无分号代码风格的时候，只需要注意：当一行代码是以 ( [ ` 开头的时候，需要在前面补一个分号，避免语法错误



<br/><br/><br/><br/><br/>
