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
      - 在滚动时，内边距也是要参与进去的


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


15. requestAnimationFrame 和 requestIdleCallback 有什么区别？
    - RAF 在每次渲染完都会尝试执行，也就是在当前帧内一定会尝试执行，高优先级
      - 如果当前帧没有空闲时间了，则会推迟到下一帧执行，如果还没有，就继续推迟，反正最终一定会执行，且每一帧最多只会执行一次
    - requestIdleCallback 空闲时执行，低优先级
      - 如果一直没有时间执行，可以设置一个超时时间，这样在到了超时时间后，会强制执行
    - 这两个任务都可以理解成宏任务
      - 并且会在无延迟时间的 setTimeout 之后执行


16. https 协议为什么是安全的？它的加密过程是什么？
    - 为什么是安全的？
      - 通过在 http 协议上添加 SSL/TLS（Secure Sockets Layer/Transport Layer Security）加密层来确保数据传输的安全性
      - 通过 “非对称加密” 结合 “对称加密” 的方式来实现数据的安全通信
        - 非对称加密（服务器生成）用于给对称密钥加密，以便安全传输
        - 对称密钥（客户端生成）用于后续的数据通信，保证了速度
    - 具体的加密过程？
      - 握手过程：
        - 客户端向服务器发起连接请求
        - 服务器返回其公钥（非对称加密的公钥）和证书给客户端
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

### Node 篇

1. 在 nodejs 中，如何开启多进程？
   - 主要有两种方式：
     - `child_process`，代码示例：[使用child_process开启多进程](./nodejs/开启多进程/使用child_process实现/index.js)
       - 子进程，适合处理一些复杂的运算场景
     - `cluster`，代码示例：[使用cluster开启多进程](./nodejs/开启多进程/使用cluster实现/index.js)
       - 集群，适合要开启多个服务的场景

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


