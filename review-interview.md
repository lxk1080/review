## review interview

### 基础篇

1. 说说箭头函数？
   - 缺点（或者说与 function 的不同）：
     - 没有 arguments
     - 无法通过 call、apply、bind 改变 this
       - this 固定指向父级作用域
     - 有些代码可能难以阅读
   - 什么时候不能用？
     - 需要获取函数的调用方 this 的时候
       - 例如：
         - 对象方法需要获取对象本身时
         - 自定义原型方法时
         - 构造函数
         - 事件监听
         - vue 的生命周期或 methods 等


2. 描述 TCP 的三次握手和四次挥手？
    - 如图：
    <br/><img src="./picture/01.jpg" width="50%" style="margin-top: 5px">


3. 在 js 中 for-in 和 for-of 的区别？
   - for-of 可以，而 for-in 不可以的：
     - 可以遍历 Set、Map、Generator
   - for-in 可以，而 for-of 不可以的：
     - 对象
   - 总结：
     - for-in 用于 “可枚举” 数据，如：数组、字符串、对象
       - 判断可枚举：使用 Object.getOwnPropertyDescriptors 方法，看每个 key 的 enumerable 属性是否为 true
     - for-of 用于 “可迭代” 数据，如：数组、字符串、Set、Map、Generator
       - 判断可迭代：看它是否有 Symbol.iterator 属性，是否是个函数


4. 关于 for await ... of 的使用？
   - 主要是用来遍历多个 Promise 的，可以得到 Promise 的响应结果
   - 例如以下代码：
     ```js
     // 一个 promise 数组
     const plist = [p1, p2, p3]
     
     // 可以使用 promise.all
     Promise.all(plist).then((data) => {
       console.log(data) // promise 的响应结果数组
     })
     
     // 也可以使用 for await ... of 进行遍历
     for await (let res of plist) {
       console.log(res) // 得到每个 promise 响应的结果
     }
     ```


5. 关于 offsetHeight、clientHeight、scrollHeight 的区别？
    - offsetHeight：`border + padding + content`
    - clientHeight：`padding + content`
    - scrollHeight：`padding + 实际内容尺寸`
      - 记住，在滚动时，内边距也是要参与进去的
    - 扩展一下：window.innerHeight 和 window.outerHeight 有啥区别？
      - window.innerHeight：浏览器窗口视口（也就是页面内容显示区域）的高度，这里面包含了滚动条（要是存在的话）
        - 用来获取浏览器视口的高度，这个属性还是比较常用的，例如图片懒加载
        - 还有个方法也可以获取浏览器视口的高度：document.documentElement.clientHeight
          - 但不包含滚动条高度（若滚动条存在，值会比 innerHeight 小）
      - window.outerHeight：整个浏览器窗口的外部高度，包括浏览器所有的界面元素，像标题栏、菜单栏、工具栏、标签页等
        - 这个属性一般和控制视口之外的元素有关，前端会比较少用到


6. 在 dom 中，Element 和 Node 的区别？
   - 首先在 Dom 树中，所有节点都是 Node
   - Node 是 Element 的基类
   - Element 是所有其它 HTML 元素的基类，如：HTMLDivElement
   - 有一张图：
     <br/><img src="./picture/02.jpg" width="60%" style="margin-top: 5px">
   - 那么，HTMLCollection 和 NodeList 的区别？
     - HTMLCollection 里面都是基于 Element 类的标签，可以用 `dom.children` 获得
     - NodeList 既可以获取标签，也可以获取文本或其它节点，可以用 `dom.childNodes` 获取
     - 注意它两都是类数组结构，不是数组，无法直接使用数组的方法，可以使用以下方法转换：
       - `Array.from(NodeList)`
       - `Array.prototype.slice.call(NodeList)`
       - `[...NodeList]`


7. JS 的严格模式有什么特点？
    - 字符串 `use strict`，可以在全局开启，或者在某一个函数开启
    - 严格控制了哪些东西？（这里列举的是部分控制）
      - 全局变量必须先声明
        - 你不能在函数里面冷不丁的写一个类似 `a = 1` 的代码
      - 禁止使用 with 语法
      - 给 eval 加了作用域
      - 禁止了 this 指向 window，而是 undefined
      - 函数的参数不能重名


8. http 跨域时为何要发送 options 请求？
   - 是跨域请求之前的预检查（但也是可能会发送 options 请求，不是一定会发）
     - 可以预先拿到服务端为 CORS（跨域资源共享）配置的各种权限
       - 例如 `Access-Control-Allow-Origin` 之类的
     - 这个请求是浏览器自行发起的，不需要开发者干预，不会影响实际的功能


9. 为什么 `0.1 + 0.2 !== 0.3` ？
   - 首先这个问题不止是 js 有，其它编程语言也有，像 C、Java、Ruby .. 都有这个问题
   - 究其原因，是和计算机的底层原理有关
     - 计算机是使用二进制来存储数据的
     - 整数转换二进制没有误差
     - 有些小数无法用二进制准确表达
       - 主要是因为，二进制在表达小数时，只能够精确表示那些能够用 `1/(2^n)` 的和的任意组合表示的小数，例如：
         - 0.5 能够被二进制精确表示，是因为它可被表示成 `1/2`
         - 0.75 也能够表示，因为它可以表示成为 `1/2 + 1/(2^2)`
         - 0.875 也能够表示，因为它可以表示成为 `1/2 + 1/(2^2) + 1/(2^3)`


10. 说一说 JS 的垃圾回收机制？
    - 引用计数
      - 看对象有没有被引用，没有被引用即触发垃圾回收
      - 这种方式对于循环引用不太好使
    - 标记清除（目前的方案）
      - 定期的从 JS 的根（Window）进行下面各个属性的遍历，遍历完没能得到的对象会被回收
      - 可以解决循环引用问题
      - 关于新生代和老生代？
        - 这个问题其实不去了解也行，因为我们开发是不能控制的，知道了也用处不大
        - 这个是标记清除算法的一个优化策略：分代回收
          - 在 V8 中会把堆分为新生代和老生代两个区域
          - 新生代中存放的是生存时间短的对象，老生代中存放的生存时间久的对象
          - 垃圾回收器又分为主垃圾回收器和副垃圾回收器
          - 主垃圾回收器负责老生代的垃圾回收，副垃圾回收器负责新生代的垃圾回收


11. 如何检测 JS 内存泄漏？
    - 主要是使用 Chrome 开发工具里的 Performance 功能，看页面在运行过程中的内存变化
    - 也可以结合 Memory 功能一起看，里面保存有当前页面实时运行的各个对象及所占内存大小


12. JS 内存泄漏的场景有哪些？
    - 以现代 Vue、React 组件为例：
       - 被全局对象、变量引用，组件销毁时未清除
         - 例如把临时变量挂到 Window 上，或者挂到外部的 data 对象上
       - 定时器，组件销毁时未清除
       - 全局事件，组件销毁时未解绑
    - 了解关于 WeakSet 和 WeakMap 的运用吗？
      - 我们拿 WeakMap 为例来讲，WeakSet 同理
        - 它的 key 值必须是引用类型的，而且它是弱引用
        - 弱引用的意思就是说，假如 WeakMap 拿了某一个对象作为 key 值，按道理来说这个对象就被引用了，但是 WeakMap 并不影响这个对象的垃圾回收（该回收回收，WeakMap 管不着），所以 WeakMap 没有 size 属性，也不能遍历，反正和大小相关的方法，它都没有
        - 这个 API 可以用于给两个对象建立联系，但是并不影响它们的垃圾回收，这样也就不会有内存泄漏的风险


13. 浏览器和 nodejs 中的事件循环有什么不同？
    - 注意，在 nodejs 官文中，并没有微任务和宏任务这个说法，这里为了方便理解，在 node 中继续使用微任务和宏任务这两个名词
    - 首先，浏览器和 nodejs 的事件循环基本上是一致的，都有同步任务，微任务和宏任务，并且微任务是在宏任务之前执行的
    - 不同点在于，nodejs 中的任务分不同的类型，和不同的优先级（关于 nodejs 事件循环的具体内容，可以在我的 nodejs 深入浅出文章中了解到）
      - 微任务执行顺序：
        - `process.nextTick`
        - `Promise、await/async`
      - 宏任务执行顺序：
        - `timers` 计时器相关
        - `pending callbacks` 网络、流、TCP 相关
        - `idle, prepare` 系统内部执行
        - `poll` I/O 相关回调
        - `check` setImmediate 的回调
        - `close callbacks` close 事件相关


14. 描述一下 js-bridge 的原理？
    - 首先什么是 js-bridge？
      - 是 js 与 APP或客户端之间通信的桥梁
      - js 是无法直接调用 native API 的，需要通过一些特定的方式来调用，这些方式就统称为 js-bridge，例如：微信 JSSDK
    - js-bridge 的原理就是 APP 往 webview 里面灌输很多自定义的 API，主要分为两种方式：
      - 注册全局 API
        - 例如直接在 window 上挂载一个方法，当 js 调用该方法时，由 APP 控制方法的执行
        - 这种方式不太适合异步的情况
      - URL Scheme
        - 例如微信的 URL Scheme：
          - `weixin://` 打开微信
          - `weixin://dl/scan` 扫一扫
          - `weixin://dl/moments` 朋友圈
        - js 可以通过 `location.href` 的方式来调用 URL Scheme，在 APP 端会做 URL 的拦截
          - 这种方式会改变页面的 url，如果 URL Scheme 没有被处理，可能会导致网页跳转到一个错误页面
        - js 也可以通过 `iframe` 的方式封装方法，通过 iframe.src 调用 URL Scheme
          - 这样就避免了直接修改 location.href，当然这只是前端调用方式的一种选择，在 APP 端还是要做 URL 拦截处理的
    - 顺带一提，Chrome 本身也是 APP，可以浏览网页也是因为有 webview，只不过它是以 webview 为主体的 AP
      - 它也实现了很多的 URL Scheme 功能，例如：
        - `chrome://version/`
        - `chrome://flags/`
        - `chrome://dino/`
        - `chrome://inspect/#devices`


15. 简述 hybrid 模板的更新流程？
    - 我们知道，前端 hybrid 技术是 App 创建一个 Webview 并通过 file 协议打开 H5 页面，这些 H5 文件是被下载到本地的
    - 那么，H5 文件更新了，App 该怎么更新这些文件呢？
    - 一般流程是这样的：
      - 前端 H5 更新完成后，部署到服务器
      - App 内下载文件到本地，并记录下包的版本号
      - 以后 App 去按时检查或某个节点去检查，如果发现服务器有新包，则下载最新的，一般会有以下几种策略：
        - App 启动时检查并下载
        - 定时检查（例如每隔 5 分钟检查一次）并下载
      - 检查到新版本后，先在后台下载，此时先用着老版本
      - 待新版本下载完成，再把老版本替换成掉，开始使用


16. requestAnimationFrame 和 requestIdleCallback 有什么区别？
    - RAF 在每次渲染完都会尝试执行，也就是在当前帧内一定会尝试执行，高优先级
      - 如果当前帧没有空闲时间了，则会推迟到下一帧执行，如果还没有，就继续推迟，反正最终一定会执行，且每一帧最多只会执行一次
    - requestIdleCallback 空闲时执行，低优先级
      - 如果一直没有时间执行，可以设置一个超时时间，这样在到了超时时间后，会强制执行
    - 这两个任务都可以理解成宏任务
      - 并且会在无延迟时间的 setTimeout 之后执行


17. 移动端点击 300ms 延迟怎么解决？
    - 首先为什么会有 300ms 延迟？
        - 是移动端设计用来支持双击操作的（例如双击放大），300ms 内点击了第二次，触发双击事件，超过 300ms 未点击，触发单击事件
    - 怎么解决延迟问题？
        - 使用 fastclick 库
            - 它会监听 touchend 事件（此事件会先于 click 事件触发）
            - 使用自定义 dom 事件模拟 click 事件
            - 把默认的 click 事件（300ms 之后触发）禁止掉
        - 对于现代浏览器，只需要加一句 meta 信息即可，主要是 `width=device-width` 这一句起作用
            - `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
            - 浏览器会认为，已经做了响应式，在移动端就没必要双击放大了，已经是合适的页面展示效果了


18. Retina 屏幕的 1px 如何实现？
    - 下面以 DPR = 2（1px 会用两个物理像素表示）的屏幕为例：
        - 使用 transform 缩放：`transform: scaleY(0.5)`
        - 使用阴影扩散：`box-shadow: 0 0 0 0.5px #e8e8e8`
            - X 偏移量 0
            - Y 偏移量 0
            - 阴影模糊半径 0
            - 阴影扩散半径 0.5px
            - 阴影颜色


19. https 协议为什么是安全的？它的加密过程是什么？
    - 为什么是安全的？
      - 通过在 http 协议上添加 SSL/TLS（Secure Sockets Layer/Transport Layer Security）加密层来确保数据传输的安全性
      - 通过 “非对称加密” 结合 “对称加密” 的方式来实现数据的安全通信
        - 非对称加密（服务器生成）用于给对称密钥加密，以便安全传输
        - 对称密钥（客户端生成）用于后续的数据通信，保证了速度
    - 具体的加密过程？
      - 握手过程：
        - 客户端向服务器发起连接请求
        - 服务器返回证书（证书内包含公钥：非对称加密的公钥）给客户端
      - 证书验证：
        - 客户端验证服务器的证书，确保其合法性和可信任性
      - 生成对称密钥：
        - 客户端生成一个随机的对称密钥（对称加密），用于后续的数据加密和解密
      - 数据加密：
        - 客户端使用服务器的公钥加密生成的对称密钥，并将其发送给服务器
        - 服务器使用自己的私钥解密客户端发送的对称密钥
      - 安全通信：
        - 此时，客户端和服务器现在都拥有了相同的对称密钥，他们使用这个对称密钥来加密和解密数据，从而保证通信的安全性和隐私性
        - 至于为什么最后要用对称加密通信？
          - 因为公钥加密是非常耗时的，对称加密算法比公钥加密算法更快，适合大量数据的加密和解密操作
    - 加密算法有哪些？
      - 可使用的加密库：crypto
      - 非对称加密：RSA、DSA、ECC、ECDSA、ElGamal
      - 对称加密：AES、DES、3DES、Blowfish、Twofish
    - 非对称和对称的区别？
      - 非对称加密：公钥用于加密，私钥用于解密，安全性高，适用于密钥交换和加密少量数据
      - 对称加密：同一个密钥用于加密和解密，速度快，但安全性依赖于密钥的安全管理
    - 如下图，https 加密和解密过程
      <br/><img src="./picture/05.jpg" width="60%" style="margin-top: 5px">


20. https 如何防止中间人攻击？
    - 我们知道 https 是加密传输的，但是黑客还是可以攻击
      - 在服务端向客户端传输公钥的过程中，黑客把公钥给换了，换成自己的公钥和私钥
      - 然后在客户端向服务器传递数据过程中，黑客用自己的私钥解密，就能拿到加密数据
    - 解决这一问题的关键就在于：证书的合法性
      - 我们使用的证书，都是第三方的，所以最好使用那种大厂的、官方的、和浏览器公司有合作的正规的证书
      - 如果是杂七杂八的证书，浏览器可能会验证不合法，就会提示警告
        - 首先，黑客的话，一般无法模拟证书，如果修改了内容，那浏览器就会验证不合法
        - 其次，如果你的服务器本身就使用的这种杂七杂八的证书，浏览器也有可能验证不通过
      - 所以对于我们开发来说，解决这一问题主要关注的点在于，如何取得官方的正规的证书
      - 中间人攻击示意图
        <br/><img src="./picture/06.jpg" width="40%" style="margin-top: 5px">
      - 浏览器警告页面
        <br/><img src="./picture/07.jpg" width="40%" style="margin-top: 5px">


21. 在 http 请求中 cookie 和 token 的区别？
    - 首先 cookie 和 session 是一对，大致流程如下：
      - 用户在浏览器登录，输入用户名和密码
      - 服务端登录校验，保存用户信息到 session 中，并将用户的唯一标识放到 cookie 中，并返回给浏览器
      - 以后，该用户在发送请求时，会带上这个 cookie 去服务器
      - 服务器根据 cookie 中的用户标识，获取用户信息
    - token 一般是用于 JWT（JSON Web Token）实现
      - 用户在浏览器登录，输入用户名和密码
      - 服务端登录校验，将用户信息整个加密成 token 并返回给浏览器
      - 以后，该用户在发送请求时，会带上这个 token 去服务器
      - 服务器直接解密 token 拿取用户信息
    - token 和 cookie 的区别总结？
      - cookie 是 http 规范，token 是自定义传递（一般是加一个 Authorization 请求头传递 token 数据）
      - cookie 默认被浏览器存储，token 需自己存储（一般会使用 localStorage）
      - cookie 有跨域限制，而 token 没有
      - cookie 设计出来就是为了解决登录验证问题，但是它有很多不好用的地方，所以人们自己发明了 token 这种方式
    - session 和 JWT 的优缺点？
      - session
        - 优点
          - 用户信息存储在服务端，可快速封禁某用户
        - 缺点
          - 占用服务端内存，硬件成本高
          - 多进程，多服务器时，不好同步，需要使用第三方缓存，如 redis
          - 跨域限制，系统复杂时，处理比较麻烦
        - 适合场景
          - 需要严格的管理用户的信息（保密、快速封禁）
      - JWT
        - 优点
          - 不占用服务器内存
          - 多进程，多服务器时，不受影响
          - 无跨域限制
        - 缺点
          - 用户信息存储在客户端，无法快速封禁某用户
          - 安全问题，万一服务端密钥泄漏，则用户信息全部丢失
          - 因为所有信息都在 token 中，请求数据量会增大
            - 这个其实影响不大，因为现代的硬件和网速条件都够好，数据大个一两 KB 也无伤大雅
        - 适合场景
          - 没有特殊要求（如创业初期的网站），可以节约很多成本


22. 如何实现 SSO（单点登录）？
    - 单点登录：只需要登录一次，就可以在相互信任的多个应用系统中共享登录状态
      - 例如：登录了淘宝，就可以使用天猫，登录了百度，就可以逛百度贴吧
      - 单点登录和联合登录的区别？
        - 单点登录注重在同一组织内使用、统一管理
        - 联登注重跨组织、跨域的身份验证和信任关系
    - SSO 实现方案？
      - 主域名相同，则可以使用共享 cookie 的方案
        - 例如：`www.baidu.com、image.baidu.com`，其中 www 和 image 属于二级域名
      - 主域名不同，使用第三方的 SSO 认证系统
        - 如图所示（最后访问系统 B 的时候，线画错了，问题不大）：
          - 下图中的 SSO 凭证就是 ticket，或者叫 token 也行，最终在 A、B、SSO 域名下都会存储
          - 客户端 A、B 的 token 可能是一样的，但是必须在 A、B 上分别存储，因为一般使用 localStorage 存储，这个并不跨域共享
          - 登录页面是 SSO 系统的，在 B 页面去 SSO 系统带的 token，是从 SSO 域名下拿到的，也就是说，会先去 SSO 的前端页面
          <br/><img src="./picture/03.jpg" width="50%" style="margin-top: 5px">
        - 使用第三方账号登录，遵循 OAuth 2.0 规范（OAuth 也是实现单点登录的常见技术方案）
          - 例如用户访问客户端，服务器判定需要登录，网站授权使用微信登录
          - 微信可能提供给客户端一个二维码，用户扫描二维码登录，返回一个 token 在客户端保存
          - 用户继续发送请求时，会带上这个 token 去服务器
          - 服务器拿这个 token 去微信做校验，校验成功则继续业务


23. HTTP 与 UDP 协议的区别？
    - 首先，HTTP 与 UDP 不是一个网络层级的
      - HTTP 是基于 TCP 的，TCP 和 UDP 是属于同一层级的
      - HTTP 是应用层，TCP 和 UDP 是传输层
    - TCP 有连接，有断开，稳定传输，一般用于网络请求
    - UDP 无连接，无断开，不稳定传输（效率高），一般用于视频会议、语音通话
      <br/><img src="./picture/04.jpg" width="30%" style="margin-top: 5px">


24. HTTP 的 1.0、1.1、2.0 有什么区别？
    - http 1.0
      - 最基础的，支持基本的 get、post 请求方法
    - http 1.1
      - 增加缓存策略：cache-control、E-tag
      - 支持长连接：Connection: keep-alive，一次 TCP 连接，可以发送多个请求
      - 支持断点续传，状态码 206
      - 支持新的请求方法：PUT、Delete .. ，可用于 Restful API
    - http 2.0
      - 可压缩请求头，减少体积（请求头一般还是有点大的，例如 cookie、token 数据都在请求头内）
      - 多路复用，一次 TCP 连接，可以多个 http 并发请求
        - 有了这个特性，之前做的有些优化就没用了
        - 例如：合并三个文件为一个文件，只用发送一次请求，来优化性能
        - 但是 http 2.0 即使面对三个文件，它也能并发请求，不会影响效率
      - 服务端推送
        - 服务端在客户端需要数据之前就主动地将数据发送到客户端缓存中，从而提高性能
        - 不过一般很少使用 http 请求进行服务端推送，还是使用 websocket 技术多一些
        - 联想到 SSE 技术，也是基于 http 协议的


25. script 标签的 defer、async 有什么区别？
    - 如图所示：
      - 什么都不写，只要遇到 script，就中断 dom 渲染，js 加载后执行
      - 使用 async 时，加载时异步，但是加载完立即执行，中断 dom 渲染
      - 使用 defer 时，加载时异步，加载完后，等待 dom 渲染完成，然后执行
      <br/><img src="./picture/08.jpg" width="60%" style="margin-top: 5px">
      - 使用 defer 是一种比较理想的方式
        - 我们之前写的：把 script 写到 body 的末尾，会在最后才加载，加载完执行
        - 使用了 defer 可以并行加载，然后等待 dom 渲染完，在最后直接执行，提升了性能


26. prefetch 和 dns-prefetch 的区别？
    - 首先，这个问题是混乱的，这两个没有可比性，可以拆分为下面两个问题：
    - preload 和 prefetch 的区别？
      - preload：预加载，资源在当前页面使用，会优先加载
      - prefetch：预获取，资源在未来页面使用，空闲时加载
    - dns-prefetch 和 preconnect 的区别？
      - dns-prefetch：DNS 预查询，针对未来页面
      - preconnect：DNS 预连接，也是针对未来页面
    - 以下为代码示例：
      ```js
        <link rel="preload" href="style.css" as="style">
        <link rel="prefetch" href="other.js" as="script">
        <link rel="stylesheet" href="style.css">
        <link rel="dns-prefetch" href="https://www.baidu.com">
        <link rel="preconnect" href="https://www.baidu.com" crossOrigin>
      ```


27. 前端的攻击方式？
    - XSS：跨站脚本攻击
      - 原理：将 js 代码插入到网页内容中，渲染时执行 js 代码
      - 预防：特殊字符替换（前端和后端都要做好自己的这一块，不要指望哪一端，出了问题前端和后端都得背锅）
      - 在 Vue、React 中不需要关注这个问题，除非：Vue 使用 v-html，React 使用 dangerouslySetInnerHtml
    - CSRF：跨站请求伪造
      - 原理：诱导用户去访问另一个网站的接口，伪造请求
        - 用户登录了 A 网站，有了 cookie
        - 黑客诱导用户到 B 网站，并发起 A 网站的请求
        - A 网站的 API 发现有 cookie，认为是用户自己操作的
      - 预防：严格的跨域限制 + 验证码机制
        - 判断 referrer（请求来源，但这个也可以伪造）
        - 为 cookie 设置 SameSite 为 Strict 模式，严格禁止跨域传递 cookie
          - 不过默认的 Lax 模式，一定程度上，已经禁止跨站点的请求携带 cookie 了，效果没有 Strict 好，但是用户体验更好
          - 在 None 模式下，浏览器会在所有请求中都发送 cookie，包括跨域（跨站点）请求，安全风险最大，各种跨域无限制
        - 关键接口可以使用短信验证码
    - Click Jacking：点击劫持
      - 原理：在诱导界面上蒙上一层透明的 iframe，诱导用户点击，实际点击的是 iframe 上的内容（例如诱导骗关注）
      - 预防：让 iframe 不能跨域加载
        - 判断 iframe 的域名和当前域名是否一致
          ```js
            if (top.location.hostname !== self.location.hostname) {
              alert('您正在访问不安全的页面，即将跳转到安全页面！')
              top.location.href = self.location.href
            }
          ```
        - 请求头添加：`X-Frame-Options: sameorigin`
          - 只能被同域名的网页加载成 iframe，第三方网页不能把我当成 iframe 加载
    - DDoS：分布式拒绝服务（后端的）
      - 原理：分布式的、大规模的流量访问，使服务器瘫痪
        - 一般是种植病毒、木马到不知情的用户设备上，然后在统一的时间控制病毒访问
      - 软件层不好做，需要硬件防护（如：阿里云 WAF）
    - SQL 注入（后端的，经典的安全问题）
      - 原理：黑客提交内容时，写入 SQL 语句，破坏数据库
      - 预防：和 XSS 类似，处理输入内容，替换特殊字符


28. WebSocket 协议和 HTTP 协议的区别？
    - WebSocket
      - 端对端通讯，client 和 server 都可以主动发消息（一开始 client 必须先和 server 建立连接）
        - 协议是以 `ws://` 开头，无跨域限制
        - 另外，ws 可升级为 wss（类似 https，加密传输）
        - 实际开发中，建议使用 socket.io 这个库，API 使用比较简洁
          - 现代浏览器自带 WebSocket 类，测试场景可以使用下
      - 使用场景？
        - 消息通知、直播间讨论区、聊天室、协同编辑
      - 连接过程？
        - 先发起 http 请求
        - 成功后再升级到 websocket 协议通讯（可以看下 ws 请求，会有个 101 切换协议的状态码）
    - 所以 ws 和 http 的区别？
      - ws 是双端通讯，http 是单端发送请求
      - ws 无跨域限制，http 有跨域限制
      - 其它的就是写法上的不同了，例如：协议名称、消息发送与接收
        - ws：`ws://` + `send/onmessage`
        - http：`http://` + `req/res`
    - 长轮询和 websocket 的区别？
      - 长轮询
        - 客户端发送 http 请求，服务端阻塞，不会立即返回，客户端等待响应
        - 服务端有结果了再返回，返回后，客户端立即再发送请求，循环往复
        - 需要处理 timeout 机制，timeout 中断后，客户端继续补发请求
      - websocket
        - 客户端发送请求无需等待服务器响应
        - 服务器有结果了，它会主动发给客户端


29. 输入 url 到网页显示的整个过程？
    - 总的来说分为三个大的步骤：
      - 网络请求：加载资源
        - DNS 查询（得到 IP 地址），建立 TCP 连接（三次握手）
        - 浏览器发起 http 请求，得到 html 源代码
          - 解析 html 过程中，遇到静态资源，还会继续发送网络请求（js、css、图片、视频）
          - 注意：静态资源可能有缓存，此时不触发请求
      - 解析：字符串 => 结构化数据（这个过程，也是整个编程学的核心，结构化才能让使用更简单）
        - html 构建 Dom 树
        - css 构建 CSSOM 树（css object model）
        - 两树结合，生成 render tree
      - 渲染：绘制页面
        - 计算各个 dom 节点的尺寸、位置，最后绘制到页面
          - 遇到 js/css 会加载，可能会执行，中断渲染，而后恢复
            - 具体要参考加载资源的方式，是否有 defer、async 之类的
          - 异步 css、图片加载，可能会触发重新渲染
    - 如何优化解析步骤？
      - css 放在 `<head>` 中，不要异步加载 css
      - js 放在 body 最下面，或合理使用 defer、async
      - `<img>` 提前定义 width、height
    - 解析步骤如图：
      <br/><img src="./picture/09.jpg" width="50%" style="margin-top: 5px">


30. 重绘 repaint 和重排 reflow 的区别？
    - 重绘
      - 只是元素外观改变，如：颜色、背景色、阴影
      - 尺寸、位置不变，不会影响其它元素的位置
    - 重排
      - 重新计算尺寸和布局，可能会影响其它元素的位置，如：元素宽高改变、增加元素、删除元素、动画
      - 重排一定伴随着重绘，性能消耗较大
      - 减少重排的方法？
        - 集中修改样式，或直接切换 class
        - 修改样式之前先 `display: none`，脱离文档流，就不会触发渲染
        - 适当的使用 BFC 的特性，不影响外部元素的位置
        - 频繁的触发，如：resize、scroll，使用防抖、节流
        - 使用 createDocumentFragment 批量操作 dom
        - 优化动画，使用 CSS3（例如 transform）和 RAF


31. 如何实现网页多 Tab 通信？
    - WebSocket
      - 需要后端支持，成本高，但是可以在跨域 tab 中传递数据
    - storage 事件监听
      - 比较方便，好控制，但不能跨域，如果没有特殊要求，推荐使用这个！
      - 一般使用 localStroage，如果传递的数据和上次相同，则不会触发事件
    - SharedWorker
      - 是 WebWorker 的其中一种，开启子进程，要注意浏览器兼容性问题，它是同域页面通信，也不跨域
      - 让多个 tab 页面都使用这个 worker，当 worker 接受到信息时，让 worker 给所有的 tab 发消息，这个 worker 主要是作为消息中转中心
      - 这个在本地调试的时候需要开启无痕模式，可以通过 `chrome://inspect` 调试


32. for 和 forEach 哪个更快？
    - for 更快
    - forEach 每次执行，都需要创建一个函数，需要额外的开销，所以更慢
    - 记住一句话：越低级的代码，性能往往越好

### Node 篇

1. 在 nodejs 中，如何开启多进程？
   - 主要有两种方式：
     - `child_process`，代码示例：[使用child_process开启多进程](./nodejs/开启多进程/使用child_process实现/index.js)
       - 子进程，适合处理一些复杂的运算场景
     - `cluster`，代码示例：[使用cluster开启多进程](./nodejs/开启多进程/使用cluster实现/index.js)
       - 集群，适合要开启多个服务的场景


2. 请描述 koa2 的洋葱圈模型？
   - 其实就和 express 的中间件执行顺序一样，遇 next() 先走 next，执行完后再回来继续
   - 可参考我的 nodejs-s 系列文章，写这个问题在这，主要是让你知道 “洋葱圈模型” 不是啥神秘的东西

### Vue 篇

1. watch 和 computed 的区别？
   - watch 用于监听现有的数据，一般不产生新数据
   - computed 用于计算产生新的数据，有缓存，methods 无缓存
   - 事实上，这两个东西并没有什么可比性


2. Vue 的组件通讯方式？
   - `props` 和 `$emit`，常规用法，父子间通讯
   - `CustomEvent`，自定义事件，适合跨多级通讯
   - `$attrs`，子组件中没有用 props 和 emits 接收的属性和方法，就会出现在 `$attrs` 上
     - 在组件中，也可以使用 `v-bind="$attrs"` 将属性和方法传递给下一级组件
     - 适用于父子通讯，作为 `props` 和 `$emit` 的替补
     - 注意 props 和 emits 属性是 Vue3 新加的
   - `$parent` 和 `$refs`，父子间通讯
     - `$parent`，子组件获取父组件的属性和方法
     - `$refs`，父组件获取子组件的属性和方法
   - `provide` 和 `inject`，上层组件 provide 数据，下层所有子组件都可以 inject 获取数据
     - 适用于父组件向下层各级子孙组件传递数据
   - `Vuex`，全局数据共享


3. Vuex 中的 mutation 和 action 的区别？
   - `mutation`：原子操作，必须写同步代码
   - `action`：可包含多个 mutation，可包含异步代码


4. Vue-router 的 MemoryHistory 是什么？
   - 其实就是在同一个 url 下，用切换不同的组件的方式，模拟切换不同的页面的效果
   - 切换路由时，不会伴随着 url 的变化
     - 这和 history、hash 完全不同，history 会伴随 pathname 的变化，hash 会伴随 hash 部分的变化
   - 在 react 中也有类似的功能


5. 对 Vue 做过哪些优化？
   - v-if 彻底销毁组件，v-show 是利用 css 隐藏组件，大部分情况下使用 v-if 更好，不要过渡优化
   - v-for 要加 key，严格来说是个优化项，不过这个在实际工作中已经是必须的了
   - 使用 computed 缓存，只要 data 数据不变，computed 就不变，不过这也是基操了
   - keep-alive 缓存组件，适用于频繁切换的组件，例如 tabs，但也不要乱用，缓存太多会占用内存
   - 对于体积较大的组件，例如：编辑器、复杂表格等，拆包，需要时异步加载，不需要不加载，可以减少主包体积，优化首屏加载速度
     - vue 内有个 defineAsyncComponent 方法，可用来加载异步组件（Vue3）
     - `defineAsyncComponent(() => import('xxx.vue')`
   - 路由懒加载
     - `() => import('xxx.vue')`
   - 服务端渲染 SSR


6. 在使用 Vue 过程中遇到过哪些坑？
   - 内存泄漏，全局变量、全局事件、全局定时器，在组件销毁时未销毁
   - Vue2 响应式的缺陷，对象增删属性、数组改变索引下的值，要使用 Vue.set、Vue.delete
   - 路由切换时 scroll 到顶部，SPA 的通病，不仅仅是 Vue
     - 例如，列表页，滚动到下面的区域，点击进入详情页，在返回列表页（重新渲染），就 scroll 到顶部了
     - 解决方法：
       - 最简单的是使用二级路由，在列表页底部放一个 router-view 加载详情页子路由，然后设置绝对定位，覆盖列表页
       - 如果列表页必须销毁重建
         - 可以尝试缓存列表页数据和 scrollTop 的值，重新渲染时，执行 scrollTo(x) 操作
         - MPA + App Webview，需要利用 App 的功能，打开详情页时，使用 new Webview 打开，这样原来的列表页 Webview 不变


7. 如何统一监听 Vue 组件报错
   - 首先，window.onerror，是 js 级别的，可以全局监听所有 js 错误，但识别不了 Vue 组件信息，可以用来监听一些 Vue 监听不到的错误
   - errorCaptured 生命周期
     - 监听所有下级组件的错误，本组件中监听不了
     - 返回 false 会阻止向上传播，意思是，如果返回 false，那么 window.onerror 将不会捕获到该错误
     - 这个错误监听一般会配置在 App.vue 组件里
     - ```js
       errorCaptured: (err, vm, info) => {
         // err 发生的错误
         // vm 对应的组件
         // info 错误信息
         return false
       }
       ```
   - errorHandler 配置
     - Vue 全局错误监听，所有组件错误都会汇总到这里，如果 errorCaptured 返回 false，则不会传播到这里
     - 如果 errorHandler 配置接收到了错误，那么 window.onerror 就接收不到信息了，猜测应该是内部阻止了
     - 这个错误监听一般会配置在 main.js 文件里
     - ```javascript
       import { createApp } from 'vue'
       import App from './App.vue'
         
       const app = createApp(App)
         
       app.config.errorHandler = (err, vm, info) => {
         // 参数和 errorCaptured 一样
       }
       ```
   - 注意，不管是 errorCaptured 还是 errorHandler 配置，都监听不到异步里面的报错，例如 setTimeout 里面的报错
     - 这个时候，window.onerror 是能监听到异步里面错误的，所以 Vue 的报错功能需要结合 window.onerror 一起使用才是完整的
   - 实际工作中，三者要结合使用
     - errorCaptured 监听一些重要的、关键的、风险性组件的错误
     - errorHandler 和 window.onerror 候补全局监听

### React 篇

1. 对 React 做过哪些优化？
   - 不要直接在 JSX 中定义匿名函数，因为每次渲染都需要重新创建
     - 需要传递参数的情况下，可以使用 dataset 属性设置参数
   - 使用 shouldComponentUpdate（SCU）判断组件是否要更新
     - 或者使用 React.PureComponent，函数式组件使用 React.memo 包裹组件，这些里面都相当于在 SCU 中做了浅比较
     - 这里引申个点，父组件更新，那么所有子组件都会更新，当然这个更新不一定包含 dom 的更新，因为通过 diff 算法算出来如果属性都没变，dom 就不会更新，但是会走生命周期
   - hooks 缓存函数和数据
     - 使用 useCallback 缓存函数，使用 useMemo 缓存数据（useMemo很像Vue的computed）
   - 异步组件
     - 使用 React.lazy + React.Suspense 组合
     - ```
       const XComponent = React.lazy(() => import('./xComponent'))
       
       <React.Suspense fallback={<div>Loading...</div>}>
         <XComponent />
       </React.Suspense>
       ```
   - 路由懒加载
     - ```
       const XComponent = React.lazy(() => import('./xComponent'))
       
       <React.Suspense fallback={<div>Loading...</div>}>
         <Switch>
           <Route path="/xPage" component={XComponent} />
         </Switch>
       </React.Suspense>
       ```
     - 和异步组件的加载方法一样，只是用在不同的地方
     - 注意：不管是异步组件还是路由懒加载，外部一定要使用 React.Suspense 包裹，否则会报错
   - 使用第三方库优化状态的改变，控制不可变数据
     - 例如 immutable、immer 之类的


2. 如何统一监听 React 组件报错
   - ErrorBoundary 组件
     - 监听所有下级组件报错，可降级显示 UI（例如里面有一个子组件报错了，可展示：组件报错了。。等自定义信息）
       - 关于降级显示 UI，只在生产模式生效，开发环境下会直接抛出错误（其实也是对开发比较友好了，开发环境下不需要那些花里胡哨的，直接改就好）
     - 只监听组件渲染时报错，不监听 DOM 事件（例如点击按钮执行 click 事件方法时的报错无法监听）、异步错误（setTimeout 内发生的错误）
     - 组件代码参考：[ErrorBoundary](React/react-z/src/components/ErrorBoundary组件/index.js)
     - 一般用在 main.js 中，用来包裹 App 根组件
   - 由于 ErrorBoundary 监听不到 DOM 事件的报错，所以还是需要 window.onerror 配合才行
     - 使用 window.onerror 监听 DOM 事件、异步错误
     - 当然你也可以使用 try..catch 去捕获错误


3. React-setState 是微任务还是宏任务？
   - 首先，我们知道，在 React 中 setState 的设计预期是：异步的、可合并的
     - 在 React18 以下的版本，在 setTimeout、自定义 DOM 事件、Promise 回调中，setState 机制不生效，变成：同步的、不可合并的
     - 在 React18 及以后的版本中，引入了 Automatic Batching 自动批处理机制，已经修复了这个问题
   - 那么，它既然是异步的，那它是微任务还是宏任务？
   - 我们知道，宏任务是在 DOM 更新之后执行，如果 setState 是宏任务，那将会导致死循环，因为 state 的变化又会触发 DOM 的更新
   - 那这么说 setState 只能是微任务了？
   - 实际上，也不是，其实 setState 的本质还是同步，只不过让 React 做成了异步的样子（因为要考虑性能，多次 state 修改，只渲染一次）
     - React 内部有个事务机制，装饰器模式，当 React 中某个方法被执行时，实际上是被装饰器函数包裹了一层
     - 方法内执行 setState 时，React 会先记下来，当方法执行完，会在装饰器中执行改变 state 的操作
     - 所以针对这个方法而言，这个 setState 的操作就像是异步任务一样
   - 所以 setState 会先于所有微任务执行，但是又在其它所有同步代码之后执行
   - 如果硬要给个答案，那 setState 是微任务，并且是优先级最高的

### 框架篇

1. 使用虚拟 Dom 和 JS 哪个操作 dom 更快？
   - 答案：JS 直接操作 dom 更快
   - 那为什么流行框架 Vue、React 还要用虚拟 Dom 呢？
     - 首先我们要知道一个事，Vue 和 React 之所以能火，并不是因为它们可以组件化
     - 而是因为：数据驱动视图（这让我们不需要手动操作 dom 了，由框架来做，所以在 dom 操作的性能上，是框架最需要关注的一件事）
     - 但是 Vue、React 操作 dom，也不能一次性整个 dom 都更新，它需要进行比较，也就是我们常说的 diff 算法
     - 而为了使用这个 diff 算法，vdom 就是目前最合适的技术方案
       - 注：vdom - 用 js 对象模拟 dom 节点数据
     - 所以，之所以用 vdom，并不是因为它快，而是因为它合适


2. Vue2、Vue3、React 的 diff 算法有什么不同？
   - React：节点仅右移
   - Vue2：双端比较
     - 四个指针：oldStart、newStart、oldEnd、newEnd
     - 四个比较：
       - 老头 和 新头
       - 老尾 和 新尾
       - 老头 和 新尾
       - 老尾 和 新头
     - 然后新老头指针往右移，新老尾指针往左移，继续进行比较
     - 直到头尾指针相遇，比较结束
     - 这种比较方式，尤其适合那种在中间插入节点的情况，头尾都不用动，只用在中间增加即可
       - 如果只从一端逐步往后做比较，则会徒增很多额外的增加或删除节点的操作
   - Vue3：最长递增子序列
     - 找出新节点中的最长递增子序列（使用老节点的索引找递增），保持不动
     - 只操作那些零散存在的节点，以最大化的减少操作次数


3. Vue、React 为何在循环时必须使用 key ？
   - 主要还是为 diff 算法的性能考虑
     - diff 算法会根据 key 判断元素是否要删除
     - 匹配了 key，只移动元素，性能较好
     - 未匹配 key，则删除重建，性能较差
   - 也就是说，如果没有 key，则会徒增额外的增加或删除节点的操作
   - 还有个问题就是：
     - 如果有需要自己操作 dom 的情况，如果没有 key，那节点每次都会删除重建，那每次重新渲染，这个 dom 都需要重新获取

### 业务篇

1. 如何进行首屏优化？
   - 代码层面优化：路由懒加载、图片懒加载、元数据按需加载、打包优化
     - 路由拆分，优先保证首页加载
     - 图片的话，最好提前设置图片尺寸，这样在渲染时只重绘，不重排
     - 元数据，按需加载，只加载首页需要的数据
     - 打包优化，splitChunks、IgnorePlugin、代码压缩、图片压缩、Tree-Shaking、transform-runtime、网络缓存
   - 服务端渲染 SSR
     - SSR 是首屏优化的终极方案
     - 其实在 Web 1.0 就有 SSR，那时候是 PHP、ASP、JSP，后来前后端分离，SSR 逐渐被人遗忘
     - 但是随着前端内容越来越大，SSR 又重新被人拾起，然后就有了 Nuxt.js（Vue）和 Next.js（React）来支持框架的服务端渲染
     - 另外，SSR 对 Seo 也是有优化的，为啥？其实很简单，SSR 的页面上所有内容都有了，利于搜索引擎搜索，不像普通页面还得发请求去拿数据
       - 其实，如果只是纯粹为了首屏优化，我是不建议使用 SSR 的，毕竟它的开发成本很高（前后端同构、调试、部署）
       - 如果既需要快，又需要 Seo 优化，那 SSR 就是个不错的选择，例如：新闻页、广告宣传页、官网等等
   - APP 预获取
     - 如果 H5 页面在 App Webview 中展示，可使用此方式
     - 用户访问列表页时，App 预加载文章首屏内容（一般会加载列表中多篇文章的首屏内容）
     - 用户进入 H5 页面，直接从 App 中获取内容，瞬间展示首屏
   - Hybrid 混合开发（App端 + Web端）
     - 提前将 html、js、css 下载到 App 内部
     - 在 App Webview 中使用 `file://` 协议加载页面文件（也就是俗称的插件）
     - 再用 ajax 获取数据展示（可以结合 App 预获取）
   - 分页
     - 只针对列表页，纯分页或底部加载
     - 目的在于减少首次请求的数据量
   - 骨架屏、loading 动画
     - 主要在于优化用户体验


2. 如果一个 H5 很慢，你该如何排查性能问题？
   - 首先这个问题，“很慢”，这个词本身就是一个模糊的词，很慢，有多慢？是哪个地方慢？加载慢还是渲染慢？还是某个页面某个操作慢？
   - 所以第一步是定位问题，有以下几个性能指标：
     - FP（First Paint）：页面加载完成后，第一次渲染，不管页面上有没有东西，总之是开始渲染了，发生变化了（用工具看，人眼肯定看不到）
     - FCP（First Contentful Paint）：第一次有内容的渲染，能看到页面上有东西了，不管是一张图或一个字一个颜色，总之能看到了
     - ~~FMP（First Meaningful Paint）：已弃用！第一次有意义的渲染，每个页面标准不一样，不知道怎样的渲染算有意义，所以弃用~~
     - DCL（DomContentLoaded）：就是页面原生的 DOM 事件，代表 DOM 结构加载完成，但是图片视频啥的可能还没加载完
     - LCP（Largest Contentful Paint）：页面加载时用户所看到的最大内容块（通常是图片或大文本等）何时呈现在屏幕上
     - L（Load）：页面原生的 DOM 事件，代表页面所有内容加载完毕
   - 如何排查？
     - Chrome DevTools
       - Performance：可以查看上述性能指标，有网页快照，有不同时间内执行的代码以及所花费的时间
       - Network：可以查看各个资源的加载时间
       - 如图：
         <br/><img src="./picture/11.jpg" width="40%" style="margin-top: 5px">
     - lighthouse 工具
       - 非常流行的第三方性能评测工具，支持移动端和 PC 端
       - 会展示多种关键性能指标，还会给你提示优化建议
       - 如图：
         <br/><img src="./picture/12.jpg" width="30%" style="margin-top: 5px">
         <br/><img src="./picture/13.jpg" width="30%" style="margin-top: 5px">
       - 安装使用：
         - `npm i lighthouse -g`
         - `lighthouse https://www.baidu.com/ --view --preset=desktop`
           - `--view` 选项表示审计完成后在浏览器中打开报告查看
           - `--preset=desktop` 表示使用桌面端的预设配置进行审计，会模拟桌面浏览器环境来评估网页
   - 最终识别问题，对症下药，解决方法，具体问题具体对待，以下的解决方法只是举个通用的例子
     - 加载慢？（FP 之前的时间）
       - 优化服务端配置，使用 CDN
       - 减少主包体积（路由懒加载，拆分组件）
       - 优化 http 缓存策略
     - 渲染慢？（FP 到 L 的时间）
       - 优化前端组件内部逻辑，减少渲染次数
       - 服务端 SSR
     - 其它具体场景
       - 日历组件渲染慢？使用 requestIdleCallback 预获取数据
       - 图片渲染慢？弃用 htmlToCanvas，手动操作画图写文字
   - 性能优化是一个循序渐进的过程，它不是硬性 bug，不能一次性解决
   - 需要持续跟进统计结果，然后逐步分析性能瓶颈，持续优化
   - 联想，使用二分法，逐步找到问题根源
   - 最后，要有 “监控” “持续跟进” 的思维，解决了问题，还得保持住才行


3. 后端一次性返回 10 万条数据，怎么渲染？
   - 首先这个问题，它的设计就是不合理的，为什么后端要一次性返回 10 万条数据？
     - 有什么场景需要这么设计？问问面试官？为什么不能分页？
   - 如果就是要处理这 10 万条数据的话？
     - 首先我们要知道，js 处理数据是没问题的，主要问题在于，dom 一次性渲染 10 万条数据会吃不消
     - 怎么处理？
       - 自定义中间层（后端的问题用后端解决）
         - 自定义 node 中间层，获取并拆分 10 万条数据
         - 这个成本会比较高
         - 当然前端也可以自己存，例如 IndexedDB
       - 虚拟列表（这个答案可能是面试官想问的？）
         - 只渲染可视区域的 dom
         - 隐藏区域不显示，只用 `<div>` 撑起高度
         - 随着浏览器的滚动，创建和销毁 dom
         - 可使用第三方 lib：vue-virtual-scroll-list、react-virtualiszed
         - 实现虚拟列表只是无奈的选择，成本可能也不低，后端的问题，应该首先由后端解决


4. 怎么实现文字超过省略？
   - 这个直接上代码，用 css 样式解决
     ```css
       /* 单行文本 */
       #box1 {
         overflow: hidden;
         white-space: nowrap; /* 不换行 */
         text-overflow: ellipsis; /* 超出省略 */
       }
       /* 多行文本 */
       #box2 {
         overflow: hidden;
         display: -webkit-box; /* 弹性伸缩盒子 */
         -webkit-box-orient: vertical; /* 子元素排列方式 */
         -webkit-line-clamp: 3; /* 显示几行，超出省略 */
       }
     ```


5. 前端设计模式？哪些使用场景？
    - 设计模式的原则：开放封闭原则
      - 对扩展开放
      - 对修改封闭
    - 常用的设计模式（具体可以看我设计模式专讲）
      - 工厂模式
        - 描述：工厂函数，创建实例，隐藏 new
        - 例如：jQuery $、React.createElement
        - 场景：需要 new 出很多实例的场景，都可以使用
      - 单例模式
        - 描述：全局唯一的实例，没有第二个
        - 例如：Vuex、Redux 的 store
        - 场景：工具函数类、modal 弹窗
      - 代理模式
        - 描述：使用者不直接访问对象，而是访问一个代理层
        - 例如：ES6 Proxy 实现 Vue3 的响应式
        - 场景：当需要对源对象做一些额外的处理，都可以使用代理模式，通过监听 get、set 方法，代理层可进行统一处理
      - 观察者模式
        - 描述：对程序中某一个对象进行实时的观察，当该对象的状态发生改变时进行通知
        - 例如：click 事件绑定、Vue2 的响应式实现
        - 场景：当某个对象状态改变，需要多处做出响应时
        - 关联：发布订阅模式
          - 描述：发布者发布一个事件，订阅者订阅这个事件，当事件触发时，通知订阅者
          - 例如：CustomEvent
          - 场景：自定义发布订阅事件类，用于跨组件通信
          - 与观察者模式的区别？
            - 观察者模式：两个角色，观察者、被观察者，被观察者改变，观察者做出响应（观察者和被观察者相互认识）
            - 发布订阅模式：三个角色，发布者、发布的事件、订阅者，发布的事件被触发，订阅者做出响应（发布者和订阅者不认识）
            - 如图：
              <br/><img src="./picture/10.jpg" width="30%" style="margin-top: 5px">
      - 装饰器模式
        - 描述：原功能不变，增加一些新功能，一般表现为套壳（在外面套一层）
        - 例如：高阶组件、ES6 或 TS 的 Decorator 语法
        - 场景：需要附加功能或需要截取参数的时候，都可以使用，例如：API 的重写（为了截取到此 API 执行时的参数）
      - 适配器模式（也叫转接器）
        - 描述：把一个接口转化成另一个接口的函数，转换后，业务可用
          - 举个例子，假如有一台旧电脑，使用的键盘，接口是 PS2 接口，现在有了新电脑，只有 USB 接口，我想用之前的键盘，就要使用转接器（适配器）
        - 例如：Number()、String()
        - 场景：各种数据类型或数据结构的转换
      - 门面模式
        - 描述：做某一件事，需要调用 a 函数和 b 函数，现在我将这两个函数都放在 c 函数内调用，这个 c 函数就是门面
          - 其实这个很重要，门面模式用的好，可以极大的提升代码的语义化、逻辑性和可读性
        - 例如：各种高级 API，Object.assign（Object.keys、Object.getOwnPropertyNames）、JSON.parse（Object.keys、Array.prototype.map）
        - 场景：封装关键的业务节点
      - 策略模式
        - 描述：以类或对象等形式去封装不同场景下的处理函数
        - 例如：对象、Map
        - 场景：优化 if-else 语句
      - 其它的设计模式（经典的总共有 23 种设计模式哈）
        - 组合模式、享元模式、命令模式、责任链模式、桥接模式


6. 遇到过哪些项目难点？是如何解决的？（这个可以准备一个）
   - 没有固定的，需要自己长期的积累总结记录
   - 回答模版
     - 描述问题：背景 + 现象 + 造成的影响
     - 解决问题：分析 + 解决方案
     - 有何成长：学到了什么 + 如何避免 + 记录
   - 具体场景
     - 解决 eventBus 中的循环引用问题，可参考代码：[eventBus实现](writeCode/eventBus实现.ts)
       - 问题：因为 eventBus 可以在各个模块使用，很容易造成循环引用问题
       - 分析：限制 emit 的执行，最终方案是：递归层级限制 || 采用状态机机制
       - 成长：很多基础工具在实际工作中还需要不断完善
     - 解决 html2canvas 不稳定的问题
       - 问题：html2canvas 渲染出来的图对 css 兼容性不好，导致 UI 错位或不显示
       - 分析：看源码，替换为别的库，最终解决：自己手动使用 canvas 画图
       - 成长：越底层的东西越稳定，控制性越好，当第三方的东西出现问题无法解决的时候，最好自己手动解决

### 手写代码篇
> 规范性、完整性、鲁棒性

1. [数组扁平化](js/flat.js)
2. [获取详细数据类型](writeCode/getType获取详细数据类型.ts)
3. [new一个对象的过程](writeCode/new一个对象的过程.ts)
4. [遍历dom树](writeCode/遍历dom树.js)
5. [LazyMan实现sleep机制](writeCode/LazyMan实现sleep机制.ts)
6. [curry函数柯里化](writeCode/curry函数柯里化.ts)
7. [instanceOf-方法实现](writeCode/instanceOf-方法实现.ts)
8. [bind方法实现](writeCode/bind方法实现.ts)
9. [call和apply方法实现](writeCode/call和apply方法实现.ts)
10. [eventBus实现](writeCode/eventBus实现.ts)
11. [LRU缓存实现](writeCode/LRU缓存实现.ts) + [使用-对象+双向链表-方式实现](writeCode/LRU缓存实现-对象-双向链表.ts)
12. [手写深拷贝-考虑各种类型及循环引用](writeCode/手写深拷贝.ts)

### 手写代码篇-2（偏业务型）

1. [将数组转成树结构](writeCode2/数组转成树.ts)
2. [将树转成数组](writeCode2/树转成数组.ts)

### 刁钻问题篇

1. `[1, 2, 3].map(parseInt)` 输出什么？
   - 首先 `parseInt` 接收两个参数，参数一是字符串（一般是字符串形式的数字，直接传数字也行），参数二表示这个数字是几进制的（2~36），方法的结果是转化成十进制数字
   - 然后 `map` 函数前两个参数分别是 `value` 和 `index`
   - 所以这行代码就相当于：
     - `parseInt(1, 0) = 1`，0 代表不存在，相当于没传，按参数默认值 10 进制处理
     - `parseInt(2, 1) = NaN`，1 进制不存在，不在 2~36 范围内，所以按错误处理
     - `parseInt(3, 2) = NaN`，2 进制下没有 3 这个数字，所以它不是一个数
   - 所以结果就是 `[1, NaN, NaN]`


2. 以下代码输出什么？（形参是变量）
   ```javascript
   function changeArgs(x) { x = 200 }
   let num = 100
   changeArgs(num)
   console.log(num)
   ```
   - 答案是 100
   - 这个其实，主要是萌新需要注意，函数的形参，其实就是一个变量，变量 `x` 被重新赋值了，怎么会改变原来变量 `num` 的值呢


3. 以下代码都输出什么？（关于作用域的问题）
    ```js
    // 用 let
    const a = 100;
    function test() {
      console.log(a); // a is not defined 或者现代浏览器直接报错：Cannot access 'a' before initialization
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

    // 首先要记住：在执行 console.log(a) 的时候，会先在当前作用域内寻找 a，即使 a 是在执行语句之后定义的
    // 情况一：用 let 时，由于 a 在后面定义，所以执行的时候，a is not defined，现代浏览器可能会直接报错
    // 情况二：用 var 的时候，由于有变量提升，相当于在 log 语句前有个 var a; 但还没赋值，所以结果是 undefined
    // 情况三：而最后函数内不定义 a，那就直接在上级作用域寻找 a，所以打出 100
    ```


4. 以下 Promise 代码执行的输出结果是什么？（Promise 的链式调用以及 then 内部返回 Promise）
    ```js
    Promise.resolve().then(() => {
      console.log(0)
      return Promise.resolve(4)
    }).then((res) => {
      console.log(res)
    })
    
    Promise.resolve().then(() => {
      console.log(1)
    }).then(() => {
      console.log(2)
    }).then(() => {
      console.log(3)
    }).then(() => {
      console.log(5)
    }).then(() => {
      console.log(6)
    })
    ```
   - 答案是：`0 1 2 3 4 5 6`
   - 这里面关键点在于 `return Promise.resolve()` 的隐式操作
     - 记住，当 `.then()` 返回一个新的 `Promise` 时，会隐式插入两个额外的微任务：
       - 第一个微任务：等待返回的 `Promise` 解决，即 `Promise.resolve(4)`
       - 第二个微任务：将解决后的值 `4` 传递到下一个 `.then()`
     - 因此，`return Promise.resolve(4)` 会导致后续 `.then((res) => console.log(res))` 延迟两个微任务执行
       - 这就相当于在 `.then((res) => console.log(res))` 前面多插入了两个 `.then()`
       - 并且，这两个 `.then()` 的执行是没有任何输出结果的


5. 以下代码输出什么？（setState 的同步异步问题）
    ```js
    // this.state.val 初始值是 0
    class ReactComp extends Component {
      componentDidMount() {
        this.setState({val: this.state.val + 1})
        console.log('a-----', this.state.val)
          
        this.setState({val: this.state.val + 1})
        console.log('b-----', this.state.val)
          
        setTimeout(() => {
          this.setState({val: this.state.val + 1})
          console.log('c-----', this.state.val)
          
          this.setState({val: this.state.val + 1})
          console.log('d-----', this.state.val)
        }, 0)
      }
    }
    ```
   - 答案：
     - React 18 以下：0 0 2 3，val 最终值是 3
     - React 18 以上：0 0 1 1，val 最终值是 2
   - 在 React 中 setState 的设计预期是：异步的（本质是同步，只不过做成了异步的样子）、可合并的（后者覆盖前者）
   - 但是 React18 以下的版本，在 setTimeout、自定义 DOM 事件、Promise 回调中，setState 机制不生效，变成：同步的、不可合并的
   - 然而，在 React18 及以后的版本中，已经修复了这个问题


6. 以下代码输出什么？（对象和属性连续赋值）
    ```js
    let a = { n: 1 }
    let b = a
    a.x = a = { n: 2 }
    console.log('a.x =>', a.x)
    console.log('b.x =>', b.x)
    ```
   - 答案：
     - a.x => `undefined`
     - b.x => `{ n: 2 }`
   - 这道题的关键在于要知道一个知识点：
     - 像 `.x` 这种属性实际上在赋值之前就已经定义了（这个其实和 js 执行流程有关，属于创建阶段的初始化）
       - 关于 js 执行上下文，可以参考我的文章：https://juejin.cn/post/7206998548343373884
     - 属性赋值可以参考如下代码：
       ```js
       const a = { n: 1 }
       a.x = 10
       
       // 上面的代码实际上是：
       const a = { n: 1 }
       a.x = undefined // 在赋值之前，a 在堆内存中长这样：{ n: 1, x: undefined }
       a.x = 10 // 在执行这一句时，会先做上面一句所描述的工作
       ```
     - 所以 js 在执行到这一句 `a.x = a = { n: 2 }` 时，会先创建 `a.x = undefined`
       - 因为还没执行语句，所以此时的 a 还是指向 `{ n: 1 }`，创建后变成 `{ n: 1, x: undefined }`
     - 然后开始做赋值操作，首先 `a = { n: 2 }`，此时 a 指向了一个新的引用 `{ n: 2 }`
     - 然后执行 `a.x = a`，注意，此时，这两个 a 是不同的引用
     - `a.x` 中的 a 是 `{ n: 1, x: undefined }`，被赋值的那个 a 是 `{ n: 2 }`
     - 所以赋值后的结果是 `{ n: 1, x: { n: 2} }`，也就是 b 的值
     - 所以最后的结果是：
       - a 的值是 `{ n: 2 }`
       - b 的值是 `{ n: 1, x: { n: 2} }`


7. 以下代码各输出什么？（对象的 key 的数据类型）
   ```js
   const a = {}, b = '123', c = 123
   a[b] = 'b'
   a[c] = 'c'
   console.log(a)
   // { '123': 'c' }
   // 当 c 作为 key 时，c.toString() = '123'，会覆盖掉 b
   // Object.keys(a) = ['123']
   
   const a = {}, b = Symbol('123'), c = Symbol('123')
   a[b] = 'b'
   a[c] = 'c'
   console.log(a)
   // { Symbol(123): 'b', Symbol(123): 'c' }
   // Object.keys(a) = [] 空数组，因为 Symbol 是唯一的，无法表示
   // 如果 b = Symbol.for('123'), c = Symbol.for('123')，则 a = { Symbol(123): 'c' }
   // Symbol 的参数是对自身的描述，Symbol.for 的参数是 key，如果 key 相同，则是同一个 Symbol
   // 另外 Symbol.for('123') 与 Symbol.for(123) 相等，对 key 类型无感
   
   const a = {}, b = { key: '123' }, c = { key: '456' }
   a[b] = 'b'
   a[c] = 'c'
   console.log(a)
   // { '[object Object]': 'c' }
   // Object.keys(a) = ['[object Object]']
   ```
   - 总结下 JS 对象 key 的数据类型
     - 只能是字符串和 Symbol 类型
     - 其它类型会被转化成字符串（调用自身的 toString 方法）

### 项目设计篇
- 请转至：[ProjectDesign](projectDesign/readme.md)

### 软技能篇
- 虽然不用写代码，但是却很重要，甚至比会写代码还重要
- [参考讲解链接](https://coding.imooc.com/lesson/562.html#mid=50859)（尤其是最后一课，很重要！）
