
import React, { useReducer } from 'react'

const initialState = { count: 0 }

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      return state
  }
}

function ReducerTest1() {
  // 很像 const [count, setCount] = useState(0)
  const [state, dispatch] = useReducer(reducer, initialState)

  return <div>
    count: {state.count}
    <br />
    <button onClick={() => dispatch({ type: 'increment' })}>increment</button>
    <button onClick={() => dispatch({ type: 'decrement' })}>decrement</button>
  </div>
}

function ReducerTest2() {
  // 很像 const [count, setCount] = useState(0)
  const [state, dispatch] = useReducer(reducer, initialState)

  return <div>
    count: {state.count}
    <br />
    <button onClick={() => dispatch({ type: 'increment' })}>increment</button>
    <button onClick={() => dispatch({ type: 'decrement' })}>decrement</button>
  </div>
}

// 两个组件使用同一个 reducer 并不能共享数据
// useReducer 只是用来处理复杂 state 变化的解决方案
function ReducerTest3() {
  return <div>
    <ReducerTest1 />
    <hr />
    <ReducerTest2 />
  </div>
}

export default ReducerTest3
