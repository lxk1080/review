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
