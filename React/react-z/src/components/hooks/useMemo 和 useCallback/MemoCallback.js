import React, { useState, memo, useMemo, useCallback } from 'react'

// 类似 class PureComponent ，对 props 进行浅层比较
const Child = memo(({ userInfo, onChange }) => {
  console.log('Child render...', userInfo)

  return (
    <div>
      <p>This is Child {userInfo.name} {userInfo.age}</p>
      <input onChange={onChange} />
    </div>
  )
})

// 父组件
function MemoCallback() {
  console.log('Parent render...')

  const [count, setCount] = useState(0)
  const [name, setName] = useState('武器')

  // const userInfo = { name, age: 20 }

  // 用 useMemo 缓存数据，有依赖，类似于 Vue 的 computed 函数，计算属性
  const userInfo = useMemo(() => {
    return {name, age: 21}
  }, [name])

  // function onChange(e) {
  //     console.log(e.target.value)
  // }

  // 用 useCallback 缓存函数，依赖可以是函数内引用的变量，但要注意不能 set，防止死循环
  const onChange = useCallback(e => {
    console.log(e.target.value)
  }, [])

  return (
    <div>
      <p>
        count is {count}
        <br />
        <button onClick={() => setCount(count + 1)}>click</button>
        <button onClick={() => setName(name + 20)}>Change Name</button>
      </p>
      <Child userInfo={userInfo} onChange={onChange} />
    </div>
  )
}

export default MemoCallback
