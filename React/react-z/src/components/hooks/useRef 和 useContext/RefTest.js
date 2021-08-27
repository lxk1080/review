import React, { useRef, useEffect } from 'react'

function RefTest() {
  const btnRef = useRef(null) // 初始值
  const numRef = useRef(0)

  useEffect(() => {
    console.log('dom: ', btnRef.current) // DOM 节点
    console.log('number: ', numRef.current) // 类似于 this 成员变量
  }, [])

  return (
    <div>
      <div ref={btnRef}>Ref Test</div>
    </div>
  )
}

export default RefTest
