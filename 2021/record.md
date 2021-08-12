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
        - float 的值不为 none
        - position 的值不为 static 或 relative
        - display 属性为 inline-block、table-cell、flex 等等
        - overflow 不为 visible

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
    - 如果 line-height 为 20px，子元素直接继承大小，如果是 1、1.5 这种，子元素继承这个倍数，行高就是倍数乘以自身的高，如果是 200% 这种，则行高直接继承算出来的值，也就是父元素的高乘以 200% 得出的值。

11. 响应式相关，了解一下：
    - 以根元素（html）的 font-size 大小来相对布局的 rem 和 media query 的配合使用
    - vw，window.innerWidth = 100vw
    - vh，window.innerHeight = 100vh
    - vmax = Math.max(1vw, 1vh)
    - vmin = Math.min(1vw, 1vh)

## js

1. typeof 能识别哪些类型

    - 所有值类型（number、string、boolean、null、undefined、symbol）
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

3. 运算符，关于 ==，除了 == null，其它地方全都用 ===，x == null，就相当于 x === null || x === undefined。

4. falsely 变量，除了以下几种，全都是 truly 变量
    - null
    - undefined
    - 0
    - NaN
    - ''
    - false

5. && 和 || 运算符返回值：或真与假

6. 原型链，参见文件：【图】原型链.png，js 文件夹也有代码。class 中继承的原理就是通过原型链，实例中没有的属性和方法就是通过 &#95;&#95;proto&#95;&#95; 一层一层的往上找的。

7. 表达式中 instanceof 的判断规则为：顺着原型链向上逐级查找，只要能找到对应的原型，都为 true。

8. 作用域和闭包，自由变量的查找是在函数定义时，不是在执行时。

9. 关于 this，this 的指向是在函数执行时确定的，不是定义时，使用箭头函数可以使 this 的取值指向定义时的上级作用域。

10. 手写 bind 函数，可以了解一下

11. 事件循环（Event Loop），可参考 【图】Event Loop.png。
    - 同步代码，一行一行放到 Call Stack 执行
    - 遇到异步，会先“记录”下（由某个JS模块或浏览器模块处理），等待时机（Promise、定时、网络请求等）
    - 时机到了，微任务移动到 Micro Task Queue，宏任务移动到 Callback Queue
    - 如果 Call Stack 为空（同步代码执行完），先执行微任务，再尝试 Dom 渲染（如果 Dom 结构已更新，则触发渲染），最后触发 Event Loop 开始轮询
    - 轮询查找 CallBack Queue，如有任务，则移动到 Call Stack 执行
    - 然后继续轮询查找（永动机）

12. Dom 事件也是基于 Event Loop 机制实现的，可以这么理解，代码执行到 setTimeout 这一句时 ，进入了浏览器的计时模块，由计时模块计算触发时间并将回调函数放到 Callback Queue，而执行到 Dom 事件绑定时，调用了浏览器的时间模块，当我们点击时，时间模块将回调函数放到 Callback Queue，最后当 Call Stack 为空时，由 Event Loop 将这些函数放到 Call Stack 执行。

13. 关于 Promise 的状态以及链用机制
    - Promise 三种状态，pendding、resolved、rejected
    - resolved 状态触发 then
    - rejected 状态触发 catch
    - then 和 catch 正常情况下返回 resolved 状态，遇到报错则返回 rejected 状态（很重要！），然后再由这个状态决定触发 then 或者 catch。

14. async/await 和 Promise 的关系
    - 执行 async 函数，返回的是 Promise 对象
    - await 相当于 Promise 的 then，处理不了 rejected 状态
    - try...catch 可捕获异常，代替了 Promise 的 catch

15. 关于异步写法的发展和一些思考
    - 解决异步回调的嵌套问题，callback hell
    - 提出 Promise，链式调用，但也是基于回调函数
    - 再提出 async/await，用同步语法写异步代码，彻底消灭回调函数
    - async/await 和 Promise 并不互斥，通常是配合使用，相辅相成
    - js 是单线程的，异步总归是是基于 event loop 的
    - 异步的本质还是回调函数， async/await 只是语法糖，但是很香！

16. 宏任务（macroTask）和微任务（microTask）
    - 宏任务：setTimeout、setInterval、Ajax、Dom事件。一般是与浏览器相关的。
        - 浏览器规定的，调用浏览器的处理模块，等待时机进入 Callback Queue
    - 微任务: Promise、async/await。一般是与 js 本身相关的。
        - ES6 语法规定的，调用 JS 引擎的处理模块，等待时机进入 Micro Task Queue
    - 微任务执行时机比宏任务要早
    - 微任务在 Dom 渲染前触发，宏任务在 Dom 渲染后触发
    - 可能是因为微任务是由 js 引擎执行的，所以 js 引擎在执行完同步任务后就顺便把微任务给做了，而如果先调用浏览器的 API，再回过头来调用 js 引擎执行微任务，这样就比较麻烦，效率低，所以就有了微任务比宏任务先执行之设计

## Dom

1. Dom 的数据结构？树

2. property（点调用的形式） 和 attribute（setAttribute、getAttribute） 的区别？
    - property 只能修改 dom 对象已有的属性
    - attribute 可以增删改查任意已有或自定义属性

3. dom 操作性能优化
    - dom 查询做缓存（尤其是 for 循环的时候）
    - 将频繁操作改为一次性操作（先用文档片段打包）

4. 获取盒模型的宽高
    - el.style.width（只能取到内联的样式）
    - window.getComputedStyle(el).width （兼容谷歌、火狐）
    - el.getBoundingClientRect().width（获取宽高以及元素的各个边到视窗左上的距离）
    - el.currentStyle.width（只有IE支持）

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

## --

1. 





<div style="height: 100px" />
