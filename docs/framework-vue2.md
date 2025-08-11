
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


3. v-for 和 v-if 不要同时用在同一个元素上，因为 v-if 的优先级更高，拿不到 v-for 中定义的变量，具体请看：https://cn.vuejs.org/guide/essentials/list.html#v-for-with-v-if


4. event 对象是原生的，事件被挂载在当前元素


5. 兄弟间组件通信：
    - 通过父组件通信
    - 自定义事件
        - `const event = new Vue()`
        - `event.$emit()`
        - `event.$on()`
        - `event.$off()` // 一般在 beforeDestroy 解绑


6. 生命周期图示，参见：/【图】/vue2.0生命周期.jpg，最新请看：https://cn.vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram
    - 需要创建 Vue 实例
    - beforeCreate
    - 初始化 Vue 内部的数据、事件和方法
    - created
    - 判断是否存在预编译模板？没有，那就采用即时编译模板（当调用 `vm.$mount(el)` 的时候），然后继续往下走，有的话直接往下走
    - beforeMount
    - 创建和插入真实 Dom 节点
    - mounted
    - 挂载完成
        - 数据变化后
        - beforeUpdate
        - 重新渲染
        - updated
    - 当组件被取消挂载时
        - beforeUnmount
        - 取消挂载
        - unmounted


7. 关于父子组件的周期调用顺序，代码在：/components/生命周期调用顺序测试，参考下图：
    - 初始化

   ![image](https://github.com/lxk1080/md-file/blob/master/image/vue-init.png?raw=true)

    - 更新，注意这个更新，只在当组件中被使用（写在了 html 模板里）的数据发生变化时，才会触发 update 生命周期（这句很重要！）。就是说，不管这个数据是父组件传过来的，还是组件自己的，只要没有写到 html 模板里，数据再变，都不会触发更新。当然这里要注意，如果写到 html 里的计算属性里用到了这个数据，那还是会触发更新的。总之就一句话，只有在 html 模板发生变化时，才会重新渲染，从而触发周期函数。

   ![image](https://github.com/lxk1080/md-file/blob/master/image/vue-update.png?raw=true)

    - 销毁

   ![image](https://github.com/lxk1080/md-file/blob/master/image/vue-destroy.png?raw=true)


8. 自定义组件的 v-model，可参考：/components/自定义v-model，具体看：https://v2.cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model
    - 主要是有个 model 属性配置，可以定义 prop 和 event


9. `this.$nextTick()`，在下次 dom 更新循环结束之后执行延迟回调
    - 在修改数据之后立即使用这个方法，可以获取更新后的 dom
    - 这个 api 存在的原因是：vue 在更新 dom 时是异步执行的（异步渲染）。这也是为了性能考虑，总不能更新一个 state 就渲染一次吧


10. 关于插槽 slot，可参考：/components/插槽slot，具体请看：https://cn.vuejs.org/v2/guide/components-slots.html
    - 普通插槽
    - 作用域插槽
    - 具名插槽


11. 动态组件，`<component :is="componentName"></component>`，适用于不确定的渲染何种组件的情况，例如新闻详情页，文字、图片排列顺序不是一定的。具体参考：https://cn.vuejs.org/guide/essentials/component-basics#dynamic-components


12. 异步组件，按需加载，用工厂函数的方式定义组件，只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染，具体可参考：https://cn.vuejs.org/guide/components/async.html

    ```js
        components: {
            'my-component': () => import('./my-async-component')
        }
    ```


13. `<keep-alive>` 缓存组件，`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们
    - 一般会用在需要频繁切换，不需要重复渲染的场景下，这也算是性能优化的一种
    - `<keep-alive>` 是一个抽象组件：它自身不会渲染一个 dom 元素，也不会出现在组件的父组件链中


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
    - MVVM 组件化，组件化不是一个新的概念，很早以前就有，早在 asp、jsp、php 或者 nodejs 时就有，但是以前的组件化只是静态渲染（渲染模板，例如 ejs 的 include 指令可以引入模板片段，这个片段就相当于一个组件），更新还是要操作 Dom（或者重新渲染一遍-前后端不分离），比较繁琐。正因为离不开操作 Dom，所以 Jquery 在以前才能如此之火，而现在的 Vue、React 提出了创新的方式：数据驱动视图，这让我们在开发的时候更关注于业务本身，操作数据，而不用关注 Dom 该如何变化
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
    - 为什么框架会有自己的 diif 算法？
        - 一般来说树 diff 的时间复杂度是 O(n^3)，因为：遍历tree1 + 遍历tree2 + 排序，这样的话，是没办法使用的
        - 优化后的时间复杂度是 O(n)，就变得可用
    - 优化后的方案
        - 只比较同一层级，不跨级比较
        - tag 不相同，则直接删掉重建，不再深度比较
        - tag 和 key，两者都相同，则认为是相同节点，不再深度比较


21. diff 源码需要注意的地方
    - h 函数：做了一系列的处理，返回一个 vnode
        - 这个 h 就对应着咱们熟悉的 createElement 函数
    - vnode：返回一个对象，`{ sel, data, children, text, elm, key }`
        - sel：根节点
        - data：属性 props
        - children：子元素节点
        - text：文本节点，和 children 不能共存
        - elm：要渲染到的 dom 元素
        - key：元素标签上的 key 值
    - patch 函数，`patch(oldVnode, newVnode)`，以下内容为 snabbdom 的 diff 算法，仅供参考，不同的库实现 diff 算法方式不一样。
        - 第一次调用，第一个参数不是 vnode，而是 Dom，需要创建一个空的 vnode 作为 oldVnode，与这个 Dom 做关联，以做后续的渲染
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
    - 模板编译成了 render 函数（字符串），执行 render 函数，返回 vnode
    - 基于 vnode 执行 patch（更新） 和 diff
    - 使用 webpack vue-loader，会在开发环境下编译模板（重要）
    - vue 组件中可以用 render 代替 template
        - lh 的 vue 版本中就用到过这个方式，使用 render 虽然写起来复杂，但是更灵活，可以更细粒度的控制各个属性


23. Vue 是如何进行渲染和更新的？可以参考：/【图】/vue渲染和更新流程.png，文档地址：https://cn.vuejs.org/v2/guide/reactivity.html#%E5%A6%82%E4%BD%95%E8%BF%BD%E8%B8%AA%E5%8F%98%E5%8C%96
    - 初次渲染过程
        - 初始化响应数据，监听 data 属性（getter setter）
        - 解析模板为 render 函数（或在开发环境已完成，vue-loader）
        - 执行 render 函数，生成 vnode
            - 执行 render 函数的时候，如果遇到了 data 属性，此时会新建一个 watcher 实例
            - 在 watcher 实例创建过程中，会触发到 data 属性的 getter 函数，函数内会将刚创建的 watcher 对象添加到 data 属性的依赖列表中（dep）
            - 之后当 data 属性改变触发 setter 时，会通知所有的 watcher，每个 watcher 都会执行自身的 Dom 更新函数，从而使组件重新渲染
            - 这些 watcher 都是观察者，而 data 属性则是被观察者
        - 渲染成真实 dom，`patch(elem, vnode)`
    - 更新过程
        - 修改 data 数据，触发 setter
        - 重新执行 render 函数，生成 newVnode
        - 更新 dom，`patch(oldVnode, newVnode)`
    - PS：文件夹 /mvvm 里面为模拟代码，可以参考，也许和现在最新版本描述的不太一样，但基本上没什么太大差距，能理解就行


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
    - 组件在多处使用，进行实例化，其内部将会使用类似 `this.$data = typeof data === 'function' ? data() : data` 这样的语句，如果 data 不是一个函数，那多个实例化的组件将会共用一份数据
    - 我觉得这并不是一件值得炫耀的事，框架真要是写的好，就不会让开发者注意这个问题，data 数据的共用问题，应该由框架缔造者解决，而不是使用者

<br/><br/><br/>
