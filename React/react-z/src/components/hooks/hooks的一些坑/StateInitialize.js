import React, { useState } from 'react'

// 子组件
function Child({userInfo}) {
  // render: 初始化 state
  // re-render: 只恢复初始化的 state 值，不会再重新设置新的值，只能用 setName 修改
  const [name, setName] = useState(userInfo.name)

  return (
    <div>
      <p>Child, props name: {userInfo.name}</p>
      <p>Child, state name: {name}</p>
    </div>
  )
}


function StateItest() {
  const [name, setName] = useState('卡尔')
  const userInfo = { name }

  return (
    <div>
      <div>
        <div>Parent</div>
        <button onClick={() => setName('瑞文')}>setName</button>
      </div>
      <Child userInfo={userInfo} />
    </div>
  )
}

export default StateItest
