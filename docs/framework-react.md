
## React

1. event 对象，默认会在最后追加一个 event 参数，不用自己传递，Vue 需要 $event 作为参数传递
    - event 是 SyntheticEvent（合成事件，`event.__proto__.constructor === SyntheticEvent`），模拟出来 Dom 事件所有能力
    - event.nativeEvent 是原生事件对象
    - 所有的事件，都被挂载到 document 上（React 16）
    - 和 Vue 事件不一样（Vue 事件是原生的 Dom 事件，React 是合成事件，关于合成事件，在下面的第 20 条内容中会有详细讲解）
    - 注：React 17 事件绑定到了 root 组件上，有利于多个 React 版本共存，例如微前端


2. 关于 setState，可以参考：/components/setState测试
    - 不可变值（ `setState({})` 的值一定是一个新的值或新的引用）
        - 如果不是不可变值，那么在 React 生命周期中，就无法判断 state 是否发生改变（像对象和数组这样的引用类型数据）

    - 关于异步更新和合并
        - React 18 以下
            - 可能是异步更新，可以参考：https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/17
                ```js
                // 一般情况下，我们认为 setState 是异步的，只有在特殊情况下，它才是同步的，如下：
                
                // 1. 直接使用是异步的
                this.setState({
                    count: this.state.count + 1
                }, () => {
                    // 回调函数中可以拿到最新的 state
                    console.log('count by callback', this.state.count) 
                })
                // 异步的，拿不到最新值
                console.log('count', this.state.count)
                
                // 2. setTimeout 中 setState 是同步的
                setTimeout(() => {
                    this.setState({
                        count: this.state.count + 1
                    })
                    console.log('count in setTimeout', this.state.count)
                }, 0)
                
                // 3. 自己定义的 DOM 事件，setState 是同步的
                bodyClickHandler = () => {
                    this.setState({
                        count: this.state.count + 1
                    })
                    console.log('count in body event', this.state.count)
                }
                componentDidMount() {
                    document.body.addEventListener('click', this.bodyClickHandler)
                }
                ```
            - 可能会被合并

                ```js
                // 假设 count = 0
                
                // 1、传入对象，会被合并，执行结果：1
                this.setState({
                    count: this.state.count + 1
                })
                this.setState({
                    count: this.state.count + 1
                })
                this.setState({
                    count: this.state.count + 1
                })
                
                // 2、传入函数，不会被合并，执行结果：3
                this.setState((prevState) => {
                    return {
                        count: prevState.count + 1
                    }
                })
                this.setState((prevState) => {
                    return {
                        count: prevState.count + 1
                    }
                })
                this.setState((prevState) => {
                    return {
                        count: prevState.count + 1
                    }
                })
                
                // 个人理解：
                // 对象的时候，是用的 this.state，三个 setState 执行的时候，由于是异步执行，所以 this.state.count 的值还没有改变
                // 用函数的时候，使用的是 prevState，应该会拿上一个函数返回的 state，函数里如果用 this.state，结果还是 1（已验证）
                // 合并的情况类似于 Object.assign()，不合并的情况类似于数组的 reduce
                // 补充：关于为什么用函数就不会合并这个问题，其实和 React 的事务机制有关，后文会讲解
                ```
        - React 18 及以上

            - <span style="color: red">注意：</span>上面说的 **可能是异步更新** 和 **可能会被合并**，是仅限于 React 18 以下的版本，在 React 18 中，全部都变成了 **异步更新** 和 **会被合并** 了，主要是因为在 React 18 中引入了 `Automatic Batching` 自动批处理


3. React 生命周期，参考：https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/


4. 父子组件的周期调用顺序，参考 Vue，差不多


5. 函数组件
    - 纯函数，输入 props，输出 JSX
    - 没有实例，没有生命周期，没有 state
    - 不能扩展方法（意思是不能像 class 组件一样定义成员方法）


6. 受控组件和非受控组件，参考：/components/受控组件和非受控组件
    - 区别：根本区别在于，组件的值是否受 state 控制
    - 受控组件：一般是 value 和 onChange 的配合使用
    - 非受控组件：一般是 defaultValue 和 ref 的配合，defaultValue 设置默认值后，使用 ref 操作 Dom 获取非受控组件的值
        - 场景：必须手动操作 Dom 元素，SetState 实现不了
        - 文件上传 `<input type="file">`
        - 某些富文本编辑器，需要传入 Dom 元素
    - 两者怎么选择？
        - 优先使用受控组件，符合 React 设计原则
        - 必须操作 Dom 时，使用非受控组件


7. Portals，传送门，`ReactDom.createPortal(<div class='modal'>{ this.props.childern }</div>, document.body)`
    - 使用场景：弹出框、右键菜单、提示信息、css 兼容性问题（父元素 overflow: hidden、父组件 z-index 太小）


8. Context，可以参考：/components/使用context生产数据
    - 使用场景：公共信息的传递（主题、语言），用 props 太繁琐，用 redux 小题大做
    - 可以跨组件使用（消费），不需要逐层向下传递


9. 异步组件，主要以下两个 api，使用场景还是用来处理：大组件、路由懒加载，可以参考：/components/异步组件
    - React.lazy
    - React.Suspense


10. SCU（shouldComponentUpdate），默认 return true

    ```
    1. react 默认：父组件有更新，子组件则无条件也更新！！！
    
    2. Vue 则不会有这个问题，Vue 使用的是 watcher 机制，只有在模板里用到的 data 数据变化才会触发更新，其他情况则不会，
       主要是因为没被用到的数据没有 watcher 去观察它，数据变化，根本没人理它
    
    3. 性能优化对于 React 更重要
    
    4. 必须配合不可变数据一起使用（主要是针对对象、数组的变化，所以 setState 的值一定要是个新数据）
    
    5. SCU 一定要每次都用吗？
        - 答案是否定的，只在需要的时候才会用（有性能问题的时候），小项目根本不需要
    ```


11. PureComponent 和 memo
    - PureComponent，在 SCU 中实现了浅比较（ 只比较对象的第一层 key 值，可以参考：https://cloud.tencent.com/developer/article/1548787?from=14588 ）
      > 注：PureComponent 中不能再写 SCU，虽然代码可以运行，但是会报红色的 <span style="color: red">warning</span>

    - memo，函数组件中的 PureComponent，shallowEqual 代码可参考：/common/PureComponent 的浅比较/shallowEqual.js，就是上面链接里面的代码
      > 注：第二个参数 isEqual 方法可以不写，memo 也是默认做了浅比较

        ```
            function MyComponent(props) {
                return (
                    <div>
                        { props.name }
                    </div>
                )
            }
            
            // 可以直接把 React 源码里面的浅比较拿过来用
            function isEqual(prevProps, nextProps) {
                return !shallowEqual(prevProps, nextProps);
            }
            
            export default React.memo(MyComponent, isEqual);
        ```

    - 尽量不要做深比较（耗性能），浅比较已经适用大部分情况


12. immutable.js，再稍微看一下，主要是要理解不可变数据的这个概念。不过我觉得这个库不好，迁移成本太大，还不如用 immer


13. 高阶组件，看一下，主要就是外面包一层父组件，封装公共逻辑，参考：/components/高阶组件


14. Render Props，与 HOC 相反，类似于包裹一个子组件，向子组件传递一个 render 函数，函数的参数就是组件需要的数据，数据的生成及更新由子组件处理，当前组件不管，当前组件只管拿来用，至于子组件怎么渲染，则由当前组件决定。参考：/components/RenderProps


15. HOC vs Render Props
    - hoc 的模式理解简单，但会增加组件层级，嵌套比较深的话，props 来源难以确定，增加维护成本和降低代码可读性
    - render props 代码简洁，局部使用，理解了 render props 之后，我觉得这个似乎要比高阶组件好用，至少 props 来源可以确定
        - 但是如果想封装多个功能，还是避免不了要嵌套很多层，代码的可读性也会变得很差


16. react-redux
    - 异步 action，就是 action 返回一个函数，函数的参数传递 dispatch，函数内容是一个异步请求，请求响应时再 dispatch，这个函数还可以传递第二个参数 getState
      > 注意：异步 action，需要使用中间件 thunk，其他可以处理异步 action 的中间件：redux-promise、redux-saga

        ```
            // 异步 action，注意：异步 action 也是需要 dispatch 去触发的：dispatch(addToDoAsync())
            export const addToDoAsync = (text) => (dispatch) => {
                fetch(url).then((data) => {
                    dispatch(addTodo(data.text))
                })
            }
            
            // 中间件写法
            import { createStore, applyMiddleware } from 'redux'
            import thunk from 'redux-thunk'
            import reducers from './reducers'
            
            const store = createStore(reducers, applyMiddleware([thunk]))
        ```
    - redux 中间件原理，主要就是对 dispatch 函数进行改造，在外层包一个函数，扩展功能，参考：/【图】/redux中间件.png、/【图】/redux中间件logger.png
        - 标准的中间件定义方式：https://redux.js.org/tutorials/fundamentals/part-4-store#writing-custom-middleware

    - redux 数据流，参考：/【图】/redux数据流.png


17. react-router，hash 和 history 模式，和 Vue 一样

    ```
        <Route path="/page" component={<Component />} />
        <Link to="/page">首页</Link>
    ```


18. vdom 和 diff 算法，核心实现的理念和其他的 vdom 实现都差不多，参考 Vue 即可


19. JSX 的本质是什么？我理解 JSX 其实是语法糖，其本质就是 createElement 函数
    - 通过 babel 编译成 React.createElement 函数（对应 Vue 的 h 函数），执行函数返回 vnode（虚拟 dom 节点，在 React 中对应的就是 fiberNode 实例）

        ```
            React.createElement('tag/componentName', props, children1, children2, ...)
            
            // 接收 3+ 个参数，第一个参数可以是 tag 标签，也可以是组件名
            // 第二个参数就是标签或组件上的属性，没有的话就是 null
            // 第三个参数就是子元素，可以是个数组，也可以展开写
            
            // 这里顺便一提，这也是为啥 jsx 文件中要引入 React，就是因为在编译的时候是依赖 React 的 createElement 方法的
        ```
    - 组件名，首字母必须大写（React规定），`React.createElement`就是通过判断首字母是否大写来识别 Element 是个 tag 还是 Component，如果是个 Component，则会继续进入组件内部找到 jsx 结构，并编译成 `React.createElement` 形式，直到最后全部都是 tag 标签为止

        ```
            // 第一个参数是 List 组件
            React.createElement(List, {
                list: list
            })
            
            // 找到 List 组件 JSX 结构，继续拆分
            React.createElement('ul', null, list.map(
                function (item, index) {
                    return React.createElement('li', {
                        key: item.id,
                    }, 'title ', item.title)
                }
            ))
        ```


20. react 合成事件，参考：/【图】/react合成事件.png
    - 通过 jsx 语法绑定到元素上的事件，其实不是真的绑定，通过冒泡机制，这些事件最终都会冒泡到 html 上，在 html 上有一个统一的合成事件，通过原生事件的 target 可以获得触发事件的元素，通过 dispatchEvent（这个是 React 内部的一个函数）去触发事件回调函数，并把 event 对象传递给它，这个 event 对象也就是合成事件的实例
    - 为何要合成事件机制？
        - 更好的兼容性和跨平台（例如：react-native）
        - 挂载到 document，可以减少内存消耗，避免频繁解绑
        - 方便事件的统一管理（如事务机制，让 setState 变成异步）
    - 注：react16 绑定到 document，react17 绑定到了 root 上了，这样有利于多个 react 版本的共存，例如微前端


21. setState 和 batchUpdate，可以参考：/【图】/react-setState主流程.png、react-isBatchingUpdates1、react-isBatchingUpdates2，参考文章：https://github.com/sisterAn/blog/issues/26
    - 异步或者同步的根本在于，isBatchingUpdates 的值，isBatchingUpdates 默认为 false，也就是同步，但是，有一个函数 batchedUpdates，这个函数会把 isBatchingUpdates 修改为 true，当 React 在调用事件处理函数之前就调用这个 batchedUpdates，就会让 React 控制的事件处理过程 setState 不会同步更新 this.state，而是异步
    - 哪些能命中 batchUpdate 机制？
        - 生命周期（和它调用的函数）
        - react 中注册的事件（和它调用的函数）
        - 总之就是：react 可以管理的入口，React 在进入函数时将 isBatchingUpdates 设为 true，函数执行完会设为 false，所以在函数内定义的异步回调函数内，isBatchingUpdates 为 false（所以异步回调内的 setState 会变成同步），可以参考上面说的几个图
    - 哪些不能命中 batchUpdate 机制？
        - setTimeout、setInterval 等（和它调用的函数）
        - 自定义的 Dom 事件（和它调用的函数），指通过 addEventListener 定义的事件
        - 在 Promise 响应后的 setState 也是同步的（因为 Promise 也是异步执行的），已经验证过
        - 总之就是：react 管不到的入口（一般是异步执行的回调函数内）
        - 注意：在 React 18 之后，所有 setState 都是异步了（引入了自动批处理机制）


22. transaction 事务机制，就是对应于 batchUpdate 运行的机制，装饰器模式，参考：/【图】/react-transaction事务机制.png
    - 从这个机制，可以看出，setState 的本质还是同步，只不过做成了异步的样子
    - 真正改变 state 的操作，是在这个装饰器中做的


23. 简述下 react 组件渲染和更新流程吧
    - 渲染
        - 初始化 props 和 state
        - 执行 render 函数，解析 JSX 结构，生成 vnode，patch 更新 Dom 结构
    - 更新
        - 触发 setState 或其他，生成 dirtyComponent（会将此脏组件先保存于脏组件列表中，后面会在事务机制函数内执行更新）
        - 遍历所有的 dirtyComponent，执行 render 函数生成 newVnode
        - patch(oldVnode, newVnode) 更新 Dom，这里 patch 只是一个过程，react 真实更新 Dom 的函数可能不叫 patch


24. 关于 fiber，React 内部运行机制，开发者体会不到
    - fiber 是啥？
        - 就是 fiberNode，在早期版本中，叫做虚拟 dom，它表现为一个 js 对象，代表 react 的一个工作单元
        - 对象内含有组件相关信息，它也是 react 的任务调度和更新机制的核心组成部分
    - patch 的过程有两个阶段
        - reconciliation 阶段（调和） - 执行 diff 算法，纯 JS 运算
        - commit 阶段（提交） - 将 diff 结果渲染 Dom
    - 可能会有性能问题
        - 单线程，JS 运算和 Dom 渲染共用同一个线程
        - 组件足够复杂时，组件更新时计算和渲染压力大，如果还有动画，可能会卡顿
    - 解决方案 fiber
        - 将 reconciliation 阶段进行任务拆分（中断和恢复，commit 阶段无法中断）
        - Dom 需要渲染时暂停计算（例如：响应用户输入），空闲时恢复
        - 主要用到 `window.requestIdleCallback` 这个 api
    - 关于 fiber 的文章：
        - fiber 架构的基础讲解：https://zhuanlan.zhihu.com/p/670914853


25. react-fiber 原理
    - 可直接参考：[文章链接](https://www.doubao.com/chat/13956407549695746)
    - fiber 解决了什么问题？
        - 首先 fiber 是在 React 16 版本开始引入的，是 React 16 重构的协调引擎，本质是重新实现的堆栈，目的是实现增量渲染
        - 传统 React 渲染过程是同步且不可中断的，当组件树庞大时，长时间占用主线程会导致页面卡顿（无法响应用户输入、动画掉帧等）
    - 怎么解决的？
        - Fiber 将渲染工作拆分成小单元，每次只处理一个单元，完成后检查是否有更高优先级任务（如用户输入），
          <br/> 如果有，则暂停当前工作，优先处理高优先级任务，从而避免主线程阻塞
    - Fiber 的核心设计思想是什么？
        - 增量渲染：将渲染任务分解为小单元，分批执行
        - 可中断与恢复：每个任务单元执行后可被暂停、恢复、终止或复用，通过优先级机制决定执行顺序
        - 优先级调度：不同任务（如动画、用户输入、网络请求）分配不同优先级，高优先级任务可打断低优先级任务
        - 双向链表结构：Fiber 节点通过 child（子节点）、sibling（兄弟节点）、return（父节点）指针形成链表，替代传统递归栈，便于中断后恢复遍历
    - Fiber 架构中，任务的优先级是如何划分的？
        - 所有任务未过期时：
            - UserBlocking：用户交互相关（如点击、输入），需立即响应（需要在 250ms 内做出反馈）
            - Normal：普通优先级（如网络请求后的更新），可延迟但不希望太久
            - Low：低优先级（如非紧急数据处理），可延迟较长时间
            - Idle：空闲时执行（如日志上报），仅在浏览器空闲时运行
        - 存在过期任务时：
            - 无论该任务原始优先级如何，只要 “已过期”（系统时间超过其过期时间），就会被视为最高紧急度，
              <br/> 立即打断所有未过期任务（包括正在执行的高优先级任务），优先执行
        - 其他说明：
            - 每个任务的过期时间是根据任务的优先级类型和创建时间计算得出的：过期时间 = 任务创建时的当前时间 + 该优先级对应的 “超时阈值”
                - “超时阈值” 是 React 为每种优先级预设的固定时长，优先级越高，阈值越小（要求越快完成）
                - React 内部为不同优先级定义了明确的阈值（不同版本可能微调，以下为典型值）：
                    - UserBlocking：250ms（用户交互相关，需快速响应）
                    - Normal：5000ms（普通更新，可延迟但不太久）
                    - Low：10000ms（低优先级任务，允许较长延迟）
                    - Idle：无穷大（仅在浏览器空闲时执行，无强制完成时间）
            - 优先级通过过期时间判断，过期时间越近，优先级越高，过期时间是一个时间戳，代表任务最晚要在这个时间前处理完成
            - 创建一个新任务会触发优先级重排，且高优先级任务会立即打断正在执行的低优先级任务
    - Fiber 的工作流程是怎样的？（双缓存机制）
        - Fiber 工作流程分为两大阶段，通过 “双缓存” 机制实现高效更新：
            - Reconciliation（协调阶段）：
                - 遍历 Fiber 树，对比新旧节点（Diff 算法），找出需要更新的节点（增删改）
                - 此阶段可中断，产出 “Effect List”（记录需要执行的 DOM 操作）
            - Commit（提交阶段）：
                - 不可中断，根据 Effect List 执行实际 DOM 操作（插入、删除、更新）
                - 同时执行 componentDidMount、componentDidUpdate 等生命周期函数
        - 双缓存：
            - 内存中存在两棵 Fiber 树：current（当前 DOM 对应的树）和 workInProgress（正在构建的新树）
            - 协调阶段在 workInProgress 树上进行修改，提交阶段将 workInProgress 切换为 current，实现 DOM 更新的原子性
    - Fiber 架构对生命周期有什么影响？
        - 由于协调阶段可中断，React 16 前的部分生命周期可能被多次调用（如 componentWillMount、componentWillUpdate），导致不可预期的副作用
        - 因此 React 16 引入了新的生命周期 API 替代：
            - 新增 getDerivedStateFromProps（纯函数，用于状态派生）、getSnapshotBeforeUpdate（在 DOM 更新前获取快照）
            - 由此避免在可中断阶段产生副作用，确保代码可预测性
    - Fiber 节点的结构是什么样的？（每个 Fiber 节点对应一个组件，包含以下核心属性）
        - type：组件类型（如函数组件、类组件、标签名、forward_ref），直接显示为函数或标签名
        - tag：组件类型对应的一个数字
            - FunctionComponent (0)：表示函数式组件
            - ClassComponent (1)：表示类组件
            - HostRoot (3)：表示根节点的工作类型
            - HostComponent (5)：表示原生 DOM 元素
            - ContextConsumer (9)：表示上下文（Context）消费者组件
            - ContextProvider (10)：表示上下文（Context）提供者组件
            - ForwardRef (11)：表示使用 React.forwardRef 创建的组件
            - MemoComponent (14)：表示使用 React.memo 创建的组件
            - SimpleMemoComponent (15)：表示使用简单的 memo 创建的组件
        - stateNode：关联的 DOM 节点或组件实例
        - child/sibling/return：指向子、兄弟、父 Fiber 节点，形成链表结构
        - pendingProps/memoizedProps：待处理的 props 和已缓存的 props（用于 Diff）
        - effectTag：标记节点需要执行的操作（如插入、删除、更新）
        - nextEffect：指向 Effect List 中的下一个节点，用于提交阶段快速遍历
    - Fiber 与虚拟 DOM 的关系是什么？
        - 虚拟 DOM 是描述 UI 的 JavaScript 对象，Fiber 是 React 的工作单元结构，两者目标不同但协同工作
        - Fiber 架构下，虚拟 DOM 的 Diff 过程被拆分为 Fiber 节点的遍历和对比，每个 Fiber 节点对应一个虚拟 DOM 节点的处理单元
        - Fiber 通过链表结构优化了虚拟 DOM 的递归遍历，使 Diff 过程可中断，提升了大型应用的性能
    - React Fiber 是如何实现可中断与恢复的？
        - 中断与恢复的实现过程：
            - 任务拆分（将渲染工作分解为小单元）
                - Fiber 将每个组件的处理（如 Diff、计算新状态）视为一个独立任务单元，每个 Fiber 节点对应一个任务单元
            - 中断机制（检查优先级并暂停）
                - React 在每个任务单元执行完毕后，会检查是否需要中断
            - 恢复机制（从暂停处继续执行）
                - 当浏览器空闲（高优先级任务完成），requestIdleCallback 会再次调用 workLoop
            - 优先级抢占（高优先级任务打断低优先级任务）
                - 如果在处理低优先级任务（如列表渲染）时，突然出现高优先级任务（如输入框输入），则会执行优先级抢占流程
        - 核心设计点：
            - 任务单元化：每个 Fiber 节点对应一个独立任务，避免长时间占用主线程
            - 链表结构：通过 child/sibling/return 指针，使遍历可随时暂停和恢复（无需像虚拟 Dom 递归那样依赖调用栈）
            - 时间切片：利用 requestIdleCallback 在浏览器空闲时处理任务，通过 timeRemaining() 判断是否中断
            - 状态保存：通过 nextUnitOfWork 指针记录当前进度，恢复时直接从该节点继续
        - 参考伪代码如下：
          ```js
          // 简化的工作循环伪代码
          function workLoop(deadline) {
            let shouldYield = false;
            // 从当前任务开始处理
            while (nextUnitOfWork && !shouldYield) {
              // 处理当前Fiber节点（一个任务单元）
              nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
              // 检查剩余时间，如果不足则中断
              shouldYield = deadline.timeRemaining() < 1;
            }
            // 如果还有未完成的任务，请求下一次浏览器空闲时间继续
            if (nextUnitOfWork) {
              requestIdleCallback(workLoop);
            }
          }
          ```
    - React 16 Fiber 三层架构指的是？
        - 所谓的 “三层架构” 通常指的是支撑整个渲染流程的三个核心模块，它们协同工作实现了可中断渲染、优先级调度等核心功能，这三层分别是：
            - Scheduler（调度器）
                - 作用：负责任务的优先级管理和调度，决定何时执行哪个任务
                - 地位：整个 Fiber 架构的 “调度中心”，决定任务的执行顺序和时机
            - Reconciliation（协调器）
                - 作用：负责找出前后两个 Fiber 树的差异（Diff 算法），标记需要更新的节点（生成 Effect List）
                - 地位：实现 “增量渲染” 的核心，将渲染任务拆分为可中断的小单元
            - Commit（提交器）
                - 作用：根据协调器生成的 Effect List，执行真实的 DOM 操作，并触发生命周期函数
                - 地位：最终将协调阶段的计算结果应用到实际 DOM，完成渲染更新
        - 三层架构的协作流程：
            - 当有更新触发（如 setState），Scheduler 会为该任务分配优先级并加入任务队列
            - Scheduler 调度该任务的执行，进入 Reconciliation 阶段：遍历 Fiber 树，计算差异并生成 Effect List（此阶段可被中断）
            - 协调完成后，进入 Commit 阶段：根据 Effect List 执行 DOM 操作和生命周期函数（此阶段不可中断）


26. 关于 .jsx 和 .js 文件后缀类型有何区别
    - .jsx 文件后缀（extension）和 JSX 语法不是一回事
    - .jsx 和 .js 没有什么本质的区别！用哪种后缀都可以
    - .jsx 文件和 .js 文件后缀是可以互换的，语法内容完全通用，.jsx 文件就是 .js 文件
    - 那为什么要用 .jsx 后缀文件名呢？
    - 其实就是一个命名规范，主要用来做文件内容区分（告诉你，这个文件内使用了 JSX 的语法）
    - 例如，Airbnb 团队就支持使用 .jsx 后缀，鼓励在 .js 文件里使用标准 js 语法，如果包含 JSX 语法就用 .jsx 文件名表明

## Hooks

1. 模拟生命周期，参考：/components/hooks/模拟生命周期
    - 需要注意 willUnMount 的模拟
        - 并不完全等同于 WillUnMount，effect 函数执行的时候（更新的时候），也会执行结束监听（在下一次 effect 函数之前执行）
        - 如果参数传递的是 []，初始化执行一次，返回的函数在组件销毁时执行一次，这时等于 willUnMount
        - 如果参数不传递或者传递类似 [a, b]，返回的函数，会在下次 effect 执行之前被执行


2. 关于 useRef 和 useContext，参考：/components/hooks/useRef 和 useContext
    - useRef，主要有两个作用
        - 用来获取 Dom 节点
        - 定义类似于 this 的成员变量
    - useContext，和 class 组件的 Context 差不多，区别就是，消费者使用 hook 的方式来引用生产者


3. useReducer，乍一看还以为 react 实现了 redux 的功能，实则不然，参考：/components/hooks/关于 useReducer
    - useReducer 是 useState 的代替方案，用于 state 复杂变化的情况
        - 我觉得这个主要用于将复杂的 state 变化情况集中在一块，以便于维护，让我们看一眼就知道 state 有哪几种变化方向
        - 还有个就是通过派发 action 的方式去改变 state，让每次改变都更加语义化了，代码可读性增加
    - useReducer 和 useState 一样，是单个组件状态管理，不能共享数据
    - 组件通讯还是需要 props，全局状态管理还是需要 redux


4. useMemo 和 useCallback，类似于 class 组件的 PureComponent，主要用来做 **性能优化**，参考：/components/hooks/useMemo 和 useCallback
    - useMemo 缓存数据，分为 useMemo 和 memo，用 useMemo 处理要缓存的数据（可传递子数据项作为依赖更新），用 memo 生成子组件
        - useMemo 的功能类似于 Vue 的 computed 函数（计算属性）
    - useCallback 缓存函数，如果函数内有用到 state，可传递 state 作为依赖参数


5. 自定义 hook，参考：/components/hooks/自定义hook
    - 不会有人问你写过哪些 hooks 吧？
        - 其实写的 hook 基本上都是些提取公共业务逻辑的 hook，例如：
            - useLoginInfo，获取用户信息
            - useDevice，获取设备信息
            - useLoading，对加载中图标的一些控制
        - 基础功能 hook 写的比较少，主要是没有太多需要，例如：
            - usePopup，从屏幕下方升起的子操作界面，传入标题与主要内容，返回：是否显示控制（setShowComp）和模态框组件（Comp）
            - usePortalModal，模态框，让组件在 document.body 下显示，处于页面最上层，返回：是否挂载控制（setShowModal）


6. hooks 使用规范，参考：/components/hooks/hook依赖于调用顺序
    - useXxx 的形式，只能用于函数组件和自定义 hook 中，使用了 hook 的函数组件可以在 class 组件中使用，可以看作与 class 组件的连接
    - 只能用于顶层代码，不能在循环、判断中使用 hooks
        - 无论是 render 还是 re-render，hooks 调用顺序必须一致，如果出现在了循环、判断中，则无法保证顺序一致，hooks 本质是纯函数，每次状态更新就会重新执行函数，而 state 的获取就是依赖于调用顺序的，这个很重要！！！
    - 可以借助 eslint-plugin-react-hooks 做代码识别


7. 关于组件逻辑复用
    - Mixins，变量作用域来源不清、属性重名
    - HOC，嵌套过多，不易渲染，不易调试，劫持 Props，容易出错
    - render props，不易理解，只能传递纯函数，功能有限
    - Hooks 做逻辑复用的好处?
        - 完全符合 hooks 原有规则，容易理解
        - 变量和作用域明确
        - 不会产生嵌套


8. 使用 hooks 的一些坑，参考：/components/hooks/hooks的一些坑
    - useState 初始化值，只有第一次是有效的，只能通过 setXxx 修改
        - 假如 state 初始化值是 `props.xxx`，那么当 `props.xxx` 的值改变时，state 的值也是不会改变的
    - useEffect 内部不能修改 state（条件为：参数为 []，使用 setInterval 定时改变 count，`setCount(count + 1)`）
        - count 的值不会改变，因为函数还是 hook 组件第一次执行的时候生成的，每次执行函数的时候 count 的值都是初始值，所以 `setCount(count + 1)` 的结果永远不变
        - 如果把 count 作为参数传递，每次 effect 函数倒是会更新，但是会造成死循环（依赖改变后重新执行函数）
        - 只能使用 `setCount((preCount) => preCount + 1)` 或者定义一个 ref 来模拟 this 成员变量来解决
        - 因为 hook 的使用，迫使我们需要懂 hook 组件的执行原理才行，并不是开箱即用，所以是个坑
    - useEffect 可能出现死循环（注意函数默认参数为对象或数组的情况，此时它们都是匿名的）
        - 例如我们定义了一个 hook 名为 useXXX，然后给了它一个默认参数 `config = {}`
        - 然后我们在这个 hook 里写了一个 useEffect，并且传递 config 作为依赖项
        - 此时 useEffect 函数内触发一次 state 的更新，就会死循环
        - 因为 config 每次都是一个匿名对象，是一个新对象，依赖改变，又会触发函数执行，造成死循环
    - 总之使用 useEffect 传递依赖项的时候要小心，操作不当，有可能会造成死循环


9. useEffect 和 useLayoutEffect 有什么区别?
    - useEffect
        - 执行时机：在浏览器完成渲染（绘制到屏幕）之后异步执行，不会阻塞浏览器的绘制过程，属于 "渲染后" 执行
        - 应用场景：适用于大多数副作用场景，如数据请求、事件监听、日志记录等不涉及 DOM 布局读取/修改的操作
        - 性能影响：不会阻塞渲染，性能更好
    - useLayoutEffect
        - 执行时机：在 DOM 更新之后、浏览器绘制之前同步执行，会阻塞浏览器的绘制，属于 "布局后，绘制前" 执行
            - 真实的 DOM 结构已经更新了，但是浏览器还没来得及画出来
            - 理论上来讲，此时开启浏览器审查元素，可以看到 DOM 结构的变化，但是屏幕上还没渲染出来
        - 应用场景：适用于需要读取 DOM 布局并立即修改的场景，如测量 DOM 元素尺寸后，设置位置，可避免页面闪烁
            - 由于是同步执行，它最大的作用就是，可以确保在浏览器绘制前完成所有 DOM 测量和修改，避免布局抖动
            - 这种修改 DOM，如果用 useEffect 去做，也就代表着在渲染完成之后再改一波样式，布局应该会跳一下
        - 性能影响：会阻塞渲染，过度使用可能导致性能问题
    - 实际使用上，优先使用 useEffect，只有在遇到布局相关问题（如元素闪烁）时才考虑使用 useLayoutEffect
    - 代码示例：
      ```js
      // useEffect - 渲染后执行
      useEffect(() => {
      // 数据请求等操作
        fetchData()
      }, [])
 
      // useLayoutEffect - 布局后，绘制前执行
      useLayoutEffect(() => {
        // 读取并修改 DOM 布局
        const { width } = elementRef.current.getBoundingClientRect()
        elementRef.current.style.width = `${width + 100}px`
      }, [])
      ```


10. react 19 更新了些啥
    - 自动批处理优化，覆盖了一些边缘情况
    - react 18 的钩子优化（useTransition、useDeferredValue、useId）
    - 新增的一些钩子（useActionState、useFormStatus、useOptimistic、use）
    - 表单处理增强（主要体现在新加的两个钩子上：useActionState、useFormStatus）
    - 服务器组件（Server Components）优化
    - 更多请参考：[文章链接](https://www.doubao.com/chat/14399091177182210)



<br/><br/><br/>
