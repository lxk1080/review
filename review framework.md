
## Vue 2

1. watch 深度监听，使用 deep 为 true，主要是对于引用类型，注意：引用类型是拿不到 oldVal 的，因为引用的地址是不变的。

```js
    watch: {
        name(newV, oldV) { // 浅
            
        },
        info: {
            handler(newV, oldV) {
            
            },
            deep: true, // 深
        }
    }
```

2. v-if 和 v-show
    - 区别：v-if 只渲染符合条件的 Dom，不符合的不会渲染出来。v-show 会把不符合条件的 Dom 渲染出来，并加上 style，display 为 none。
    - 场景：如果只进行一次渲染，变量更新不频繁，就用 v-if。如果更新很频繁，就用 v-show，因为用 display 的方式控制显示隐藏，不用操作 Dom，性能会好一些。

3. v-for 和 v-if 不要同时用在同一个元素上，具体请看：https://cn.vuejs.org/v2/style-guide/#%E9%81%BF%E5%85%8D-v-if-%E5%92%8C-v-for-%E7%94%A8%E5%9C%A8%E4%B8%80%E8%B5%B7%E5%BF%85%E8%A6%81

4. event 对象是原生的，事件被挂载在当前元素

5. 兄弟间组件通信：
    - 通过父组件通信
    - 自定义事件
        - `const event = new Vue()`
        - `event.$emit()`
        - `event.$on()`
        - `event.$off()` // 一般在 beforeDestroy 解绑
    
6. 生命周期图示，参见：/【图】/vue2.0生命周期.jpg

7. 关于父子组件的周期调用顺序，代码在：/components/生命周期调用顺序测试，参考下图：
    - 初始化
    
    ![image](https://github.com/lxk1080/md-file/blob/master/image/vue-init.png?raw=true)

    - 更新，注意这个更新，只在当组件中被使用（写在了 html 模板里）的数据发生变化时，才会触发 update 生命周期（这句很重要！）。就是说，不管这个数据是父组件传过来的，还是组件自己的，只要没有写到 html 模板里，数据再变，都不会触发更新。当然这里要注意，如果写到 html 里的计算属性里用到了这个数据，那还是会触发更新的。总之就一句话，只有在 html 模板发生变化时，才会重新渲染，从而触发周期函数。
    
    ![image](https://github.com/lxk1080/md-file/blob/master/image/vue-update.png?raw=true)
    
    - 销毁
    
    ![image](https://github.com/lxk1080/md-file/blob/master/image/vue-destroy.png?raw=true)

8. 自定义组件的 v-model，可参考：/components/自定义v-model，具体看：https://cn.vuejs.org/v2/guide/components-custom-events.html#%E5%B0%86%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A%E5%88%B0%E7%BB%84%E4%BB%B6

9. `this.$nextTick()`，在下次 dom 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 dom。这个 api 存在的原因是因为，vue 在更新 dom 时是异步执行的（异步渲染）。

10. 关于插槽 slot，可参考：/components/插槽slot，具体请看：https://cn.vuejs.org/v2/guide/components-slots.html
    - 普通插槽
    - 作用域插槽
    - 具名插槽

11. 动态组件，`<component :is="componentName"></component>`，适用于不确定的渲染何种组件的情况，例如新闻详情页，文字、图片排列顺序不是一定的。具体参考：https://cn.vuejs.org/v2/guide/components.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6

12. 异步组件，按需加载，用工厂函数的方式定义组件，只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染，具体可参考：https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6
    
    ```js
        components: {
            'my-component': () => import('./my-async-component')
        }
    ```

13. `<keep-alive>` 缓存组件，`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。`<keep-alive>` 是一个抽象组件：它自身不会渲染一个 dom 元素，也不会出现在组件的父组件链中。

14. mixins，混入，接收一个混入对象的数组。提取公共逻辑，具体参考：https://cn.vuejs.org/v2/guide/mixins.html
    - 混入对象的钩子将在组件自身钩子之前调用
    - 值为对象的选项，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对
    - 缺点：
        - 变量来源不明确，不利于阅读
        - 多个 mixin 可能造成命名冲突
        - mixin 和组件可能出现多对多的关系，复杂度较高

15. vuex，可以看 music 项目复习一下，总的来说使用简单

16. vue-router，也可以参考 music 项目
    - 路由模式
        - hash 模式（默认），如 `http://abc.com/#/user/10`
        - h5 history 模式，如 `http://abc.com/user/10` 需要 server 端支持

17. 对于 MVVM 的理解
    - MVVM 组件化，组件化不是一个新的概念，很早以前就有，早在 asp、jsp、php 或者 nodejs 时就有，但是以前的组件化只是静态渲染，更新还是要操作 Dom，比较繁琐。离不开操作 Dom，所以 Jquery 在以前才能如此之火，而现在的 Vue、React 提出了创新的方式：数据驱动视图，这让我们在开发的时候更关注于业务本身，操作数据，而不用关注 Dom 该如何变化
    - 可以参考 MVVM 模型：/【图】/Vue-MVVM.png

18. Vue 的响应式是如何实现的？
    - 核心 API：Object.defineProperty，可以参考文件：/components/vue的响应式实现，详细的可参照：/mvvm
        - 缺点：
        
            - 深度监听，需要递归到底，一次性计算量大（如果 data 数据量很大，那么这样一次性递归到底，速度会很慢，有可能会卡住）
            - 无法监听新增/删除属性（defineProperty API 没有这个方法，需要使用 Vue.set Vue.delete）
            - 无法监听数组，需要特殊处理（也就是重新定义一个数组原型，重写数组的原生方法。到这里也就明白了，为什么 Vue 对于数组的某些改变不能监听，是因为索引和长度都是静态属性，方法可以重写包装，而属性不能）
    
    - 由于 defineProperty 的问题所在，需要注意已下内容，具体在：https://cn.vuejs.org/v2/guide/reactivity.html#%E6%A3%80%E6%B5%8B%E5%8F%98%E5%8C%96%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9
    
    ```js
        // 1. 对象属性的添加或删除需要使用 Vue.set Vue.delete
        
        // 添加
		this.obj.a = 'success';
		// 改为：
		this.$set(this.obj, 'a', 'success');
		
		// 删除
		delete this.obj.name;
		// 改为：
		this.$delete(this.obj, 'name');
		
		// 2. 对于数组的变动
		
		// 利用索引直接设置一个数组项时
		this.arr[0] = 'one';
		// 改为：
		this.$set(this.arr, 0, 'one');
		// 或：
		this.arr.splice(0, 1, 'one');
		
		// 修改数组的长度时
		this.arr.length = 2;			
		// 改为：
		this.arr.splice(2);
    ```

19. 虚拟 Dom（vdom），用 js 模拟 Dom 结构（vnode），通过新旧 vnode 对比（使用 diff 算法对比），得出最小的更新范围，最后更新 Dom。在数据驱动视图的模式下，能够有效的控制 Dom 操作。

20. diff 算法（新旧 vnode 如何对比）
    - 只比较同一层级，不跨级比较
    - tag 不相同，则直接删掉重建，不再深度比较
    - tag 和 key，两者都相同，则认为是相同节点，不再深度比较

21. diff 源码需要注意的地方
    - h 函数：做了一系列的处理，返回一个 vnode
    - vnode：返回一个对象，`{ sel, data, children, text, elm, key }`
        - sel：根节点
        - data：属性 props
        - children：子元素节点
        - text：文本节点，和 children 不能共存
        - elm：要渲染到的 dom 元素
        - key：元素标签上的 key 值
    - patch 函数，`patch(oldVnode, newVnode)`，以下内容为 snabbdom 的 diff 算法，仅供参考，不同的库实现 diff 算法方式不一样。
        - 第一次是调用，第一个参数不是 vnode，而是 Dom，需要创建一个空的 vnode 作为 oldVnode，与这个 Dom 做关联，以做后续的渲染
        - 接下来，判断 oldVnode 是否与 newVnode 相同，不相同的话，直接把 oldVnode 删了重建。判断是否相同的方法是通过判断 sel 和 key 是否都相同的，这也说明了为什么 v-for 循环中加 key 很重要了
        - 如果相同，按道理来讲，应该就不再深度比较了，不过这里 snabbdom 做了调整，继续执行 patchVnode 函数
        - 把 oldVnode 的 elm 赋值给 newVnode 的 elm，以供 newVnode 渲染
        - 获取 oldVnode 和 newVnode 的 children，后面就是用 children 做条件语句判断（找不同），根据不同情况，执行 addVnodes、removeVnodes、setTextContent 等方法
        - 主要就是看有一个条件：oldVnode 和 newVnode 都有 children，会继续触发 updateChildren 函数
        - updateChildren 函数接受了 oldVnode 和 newVnode 的 children 作为参数，然后把 oldChildren 和 newChildren 进行对比。这里在 snabbdom 里的算法是，先做以下四种比较：
            - oldChildren[start] 和 newChildren[start]
            - oldChildren[end] 和 newChildren[end]
            - oldChildren[start] 和 newChildren[end]
            - oldChildren[end] 和 newChildren[start]
        - 每次比较之后 start 和 end 索引都会改变，向中间靠拢，start 和 end 相遇时结束，以上四个对比有一个相同就会触发 patchVnode 函数，然后重复第三个步骤。如果以上条件都不成立，就会拿 newChildren 的 key，看能否对应上 oldChildren 中某个节点的 key，没对应上直接插入，对应上了，还得比较 sel 是否相等，不相等的话还是插入，相等了，就走 patchVnode 函数，继续重复第三个步骤。

22. 模板编译，可以参考： /components/vue的模板编译
    - 模板编译成了 render 函数，执行 render 函数，返回 vnode
    - 基于 vnode 执行 patch（更新） 和 diff
    - 使用 webpack vue-loader，会在开发环境下编译模板（重要）

23. Vue 是如何进行渲染和更新的？可以参考：/【图】/vue渲染和更新流程.png，文档地址：https://cn.vuejs.org/v2/guide/reactivity.html#%E5%A6%82%E4%BD%95%E8%BF%BD%E8%B8%AA%E5%8F%98%E5%8C%96
    - 初次渲染过程
        - 解析模板为 render 函数（或在开发环境已完成，vue-loader）
        - 触发响应式，监听 data 属性（getter setter）
        - 执行 render 函数，生成 vnode（每个组件实例都对应一个 watcher 实例，执行 render 函数的时候，会触发“接触”过的 data 属性的 getter，watcher 实例会将 data 属性记录为依赖，之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染）
        - patch(elem, vnode)
    - 更新过程
        - 修改 data 数据，触发 setter
        - 重新执行 render 函数，生成 newVnode
        - patch(oldVnode, newVnode)
    - PS：以前的 /mvvm 里面为模拟代码，可以参考，和现在描述的可能不太一样，一切以现在最新的为准（没办法，现在的是官方文档就是这么说的）

24. 前端路由实现的原理，可以参考：/h5/feature/05_历史管理.html
    - hash，可以通过 `window.onhashchange` 事件监听 hash 的变化
        - 如何触发 hash 的变化？
            - js 修改（切换路由）
            - 手动修改
            - 浏览器的前进后退
        - hash 的特点
            - hash 变化会触发网页的跳转，即浏览器的前进、后退
            - hash 变化不会刷新页面，SPA 必需的特点
            - hash 永远不会提交到 server 端（前端自生自灭）

    - history，需要后端支持，后端要永远返回 index.html 页面
        - 用的是 url 规范的路由，但跳转时不刷新页面
        - `history.pushState`，切换路由
        - `history.onpopState`，可以在浏览器前进后退时响应，也可以在 hash 变化时响应
        
    - 两者怎么选择？
        - 后台管理系统（to B），hash，简单易用 ，对 url 不敏感
        - to C 系统，可以考虑用 history
        - 总之能用简单的，就不用复杂的

25. 为什么组件 data 必须是一个函数？
    - 组件在多处使用，进行实例化，其内部将会使用类似 `this.$data = typeof data === 'function' ? data() : data` 这样的语句，如果 data 不是一个函数，那多个实例化的组件将会共用一份数据。

## React

1. event 对象，默认会在最后追加一个 event 参数，不用自己传递，Vue 需要 $event 作为参数传递
    - event 是 SyntheticEvent（合成事件，`event.__proto__.constructor === SyntheticEvent`），模拟出来 Dom 事件所有能力
    - event.nativeEvent 是原生事件对象
    - 所有的事件，都被挂载到 document 上（React 16）
    - 和 Vue 事件不一样（Vue 事件是原生的 Dom 事件）
    - 注：React 17 事件绑定到了 root 组件上，有利于多个 React 版本共存，例如微前端

2. 关于 setState，可以参考：/components/setState测试
    - 不可变值（ `setState({})` 的值一定是一个新的值或新的引用）
    - 可能是异步更新，可以参考：https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/17
    
        ```js
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
        
        // 个人理解：对象的时候，是用的 this.state，三个 setState 执行的时候，this.state.count 的值还没有改变
        // 用函数的时候，使用的是 prevState，应该会拿上一个函数返回的 state，函数里如果用 this.state，结果还是 1
        // 合并的情况类似于 Object.assign()，不合并的情况类似于数组的 reduce
        ```

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

9. 异步组件，主要以下两个 api，使用场景还是用来处理：大组件、路由懒加载，可以参考：/components/异步组件
    - React.lazy
    - React.Suspense

10. SCU（shouldComponentUpdate），默认 return true
    
    ```
    1. react 默认：父组件有更新，子组件则无条件也更新！！！
    
    2. Vue 则不会有这个问题，Vue 使用的是 watcher 机制，只有在模板里用到的 data 数据变化才会触发更新，其他情况则不会，
       主要是因为没被用到的数据不会被 watcher 收集为依赖，数据变化，根本没人理它
    
    3. 性能优化对于 React 更重要
    
    4. 必须配合不可变数据一起使用（主要是针对对象、数组的变化，所以 setState 的值一定要是个新数据）
    
    5. SCU 一定要每次都用吗？
        - 答案是否定的，只在需要的时候才会用（有性能问题的时候），小项目根本不需要
    ```
    
11. PureComponent 和 memo
    - PureComponent，在 SCU 中实现了浅比较（ 只比较对象的第一层，可以参考：https://cloud.tencent.com/developer/article/1548787?from=14588 ）
        > 注：PureComponent 中不能再写 SCU，虽然代码可以运行，但是会报红色的 <span style="color: red">warning</span>

    - memo，函数组件中的 PureComponent，shallowEqual 代码可参考：/common/PureComponent 的浅比较/shallowEqual.js，就是上面链接里面的代码
    
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
    - render props 代码简洁，局部使用，理解了 render props 之后，我觉得这个似乎要比高阶组件好用

16. react-redux
    - 异步 action，就是 action 返回一个函数，函数的参数传递 dispatch，函数内容是一个异步请求，请求响应时再 dispatch，这个函数还可以传递第二个参数 getState
        > 注意：异步 action，需要使用中间件 thunk，其他可以处理异步 action 的中间件：redux-promise、redux-saga

        ```
            // 异步 action
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
    
    - redux 数据流，参考：/【图】/redux数据流.png

17. react-router，hash 和 history 模式，和 Vue 一样

    ```
        <Route path="/page" component={<Component />} />
        <Link to="/page">首页</Link>
    ```

18. vdom 和 diff 算法，核心实现的理念和其他的 vdom 实现都差不多，参考 Vue 即可

19. JSX 的本质是什么？我理解 JSX 其实是语法糖
    - 通过 babel 编译成 React.createElement 函数（对应 Vue 的 h 函数），执行函数返回 vnode
    
        ```
            React.createElement('tag/componentName', props, children1, children2, ...)
            
            // 接收3+个参数，第一个参数可以使 tag 标签，也可以是组件名
            // 第二个参数就是标签或组件上的属性
            // 第三个参数就是子元素，可以是个数组，也可以展开写
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
    - 通过 jsx 语法绑定到元素上的事件，其实不是真的绑定，通过冒泡机制，这些事件最终都会冒泡到 html 上，在 html 上有一个统一的合成事件，通过原生事件的 target 可以获得触发事件的元素，通过 dispatchEvent 的方式去触发事件回调函数，并把 event 对象传递给它，这个 event 对象也就是合成事件的实例
    - 为何要合成事件机制？
        - 更好的兼容性和跨平台（例如 react native）
        - 挂载到 document，可以减少内存消耗，避免频繁解绑
        - 方便事件的统一管理（如事务机制）
    - 注：react16 绑定到 document，react17 绑定到了 root 上了，这样有利于多个 react 版本的共存，例如微前端
    
21. setState 和 batchUpdate，可以参考：/【图】/react-setState主流程.png、react-isBatchingUpdates1、react-isBatchingUpdates2，参考文章：https://github.com/sisterAn/blog/issues/26
    - 异步或者同步的根本在于，isBatchingUpdates 的值，isBatchingUpdates 默认为 false，也就是同步，但是，有一个函数 batchedUpdates，这个函数会把 isBatchingUpdates 修改为 true，当 React 在调用事件处理函数之前就会调用这个 batchedUpdates，造成的后果，就是由 React 控制的事件处理过程 setState 不会同步更新 this.state，而是异步
    - 哪些能命中 batchUpdate 机制？
        - 生命周期（和它调用的函数）
        - react 中注册的事件（和它调用的函数）
        - 总之就是：react 可以管理的入口
    - 哪些不能命中 batchUpdate 机制？
        - setTimeout、setInterval 等（和它调用的函数）
        - 自定义的 Dom 事件（和它调用的函数），指通过 addEventListener 定义的事件
        - 总之就是：react 管不到的入口

22. transaction 事务机制，就是对应于 batchUpdate 运行的机制，参考：/【图】/react-transaction事务机制.png

23. 简述下 react 组件渲染和更新流程吧
    - 渲染
        - 初始化 props 和 state
        - 执行 render 函数，解析 JSX 结构，生成 vnode，patch 更新 Dom 结构
    - 更新
        - 触发 setState 或其他，生成 dirtyComponent
        - 遍历所有的 dirtyComponent，执行 render 函数生成 newVnode
        - patch(oldVnode, newVnode) 更新 Dom，这里 patch 只是一个过程，react 真实更新 Dom 的函数可能不叫 patch

24. 关于 fiber，React 内部运行机制，开发者体会不到
    - patch 的过程有两个阶段
        - reconciliation 阶段 - 执行 diff 算法，纯 JS 运算
        - commit 阶段 - 将 diff 结果渲染 Dom
    - 可能会有性能问题
        - 单线程，JS 运算和 Dom 渲染共用同一个线程
        - 组件足够复杂时，组件更新时计算和渲染压力大，如果还有动画，可能会卡顿
    - 解决方案 fiber
        - 将 reconciliation 阶段进行任务拆分（commit 无法拆分）
        - Dom 需要渲染时暂停计算，空闲时恢复
        - 主要用到 `window.requestIdleCallback` 这个 api

## Hooks

1. 模拟生命周期，参考：/components/hooks/模拟生命周期
    - 需要注意 willUnMount 的模拟

        - 并不完全等同于 WillUnMount，effect 函数执行的时候（更新的时候），也会执行结束监听
        - 如果参数传递的是 []，初始化执行一次，返回的函数在组件销毁时执行一次，这时等于 willUnMount
        - 如果参数不传递或者传递类似 [a, b]，返回的函数，会在下次 effect 执行之前被执行

2. 关于 useRef 和 useContext，参考：/components/hooks/useRef 和 useContext
    - useRef，主要有两个作用

        - 用来获取 Dom 节点
        - 定义类似于 this 的成员变量
    - useContext，和 class 组件的 Context 差不多，区别就是，消费者使用 hook 的方式来引用生产者

3. useReducer，乍一看还以为 react 实现了 redux 的功能，实则不然，参考：/components/hooks/关于 useReducer
    - useReducer 是 useState 的代替方案，用于 state 复杂变化的情况
    - useReducer 和 useState 一样，是单个组件状态管理，不能共享数据
    - 组件通讯还是需要 props，全局状态管理还是需要 redux

4. useMemo 和 useCallback，类似于 class 组件的 PureComponent，主要用来做 **性能优化**，参考：/components/hooks/useMemo 和 useCallback
    - useMemo 缓存数据，分为 useMemo 和 memo，用 useMemo 处理要缓存的数据（可传递子数据项作为依赖更新），用 memo 生成子组件
    - useCallback 缓存函数，如果函数内有用到 state，可传递 state 作为依赖参数

5. 自定义 hook，参考：/components/hooks/自定义hook

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
    - useEffect 内部不能修改 state（条件为：参数为 []，详细的看参考代码，有说明）
    - useEffect 可能出现死循环（注意函数默认参数为对象或数组的情况，此时它们都是匿名的）









<br/><br/><br/><br/><br/>
