import React from 'react'
import useAxios from './useAxios'
import useMousePosition from './useMousePosition'

function CustomHookTest() {
  const url = 'http://localhost:3000/'
  const [loading, data, error] = useAxios(url)
  const [x, y] = useMousePosition()

  return (
    <div style={{ height: '500px', backgroundColor: '#ccc' }}>
      <p>鼠标位置 {x} {y}</p>
      <div>
        {loading ? <div>loading...</div> : (
          error
            ? <div>{JSON.stringify(error)}</div>
            : <div>{JSON.stringify(data)}</div>
        )}
      </div>
    </div>
  )
}

export default CustomHookTest
