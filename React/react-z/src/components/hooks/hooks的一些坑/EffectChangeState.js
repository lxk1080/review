import React, { useState, useRef, useEffect } from 'react'

function EffectChangeState() {
  const [count, setCount] = useState(0)

  const countRef = useRef(0)

  // 模拟 DidMount
  useEffect(() => {
    console.log('useEffect...', count)

    const timer = setInterval(() => {
      console.log('setInterval...', countRef.current)

      // useRef 的方式是可用的
      // setCount(++countRef.current)

      // 这种方式更简洁，推荐使用！
      setCount((preCount) => preCount + 1)

    }, 1000)

    return () => clearInterval(timer)
  }, []) // 依赖为 []

  // 依赖为 [] 时： re-render 不会重新执行 effect 函数
  // 没有依赖：re-render 会重新执行 effect 函数

  // 1、首先：如果使用 setCount(count + 1)，由于 effect 函数只执行一次，所以 count 每次都是 0，count 最终只能是 1
  //      1. 另外 ++count 会报错，因为 count 是常量，不能重新赋值
  // 2、如果把 count 作为参数传递，每次 effect 函数都会更新，又会 setCount，又会更新，造成死循环
  // 3、如果没有依赖，和把 count 作为参数传递一样，死循环
  // 4、解决方案：
  //      1. 使用全局变量，let mycount = 0，然后使用 setCount(++mycount)，这种方式在第一次初始化后，mycount 就是第一次定义的值，以后每次更新，会重新定义 mycount，但是已经用不到了
  //      2. useRef 方式，推荐使用这个，符合 hooks 编码规范
  //      3. 补充：setCount 内可以传递一个函数，可以这么写：setCount((preCount) => preCount + 1)，这种方式是后来知道的，更加简洁，推荐！

  return <div>count: {count}</div>
}

export default EffectChangeState
