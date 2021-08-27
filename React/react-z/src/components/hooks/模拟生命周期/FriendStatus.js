import React, { useState, useEffect } from 'react'

function FriendStatus({ friendId }) {
  const [status, setStatus] = useState(false)

  // Mount
  useEffect(() => {
    console.log('初始化完成')
  }, [])

  // Mount 和 Update
  useEffect(() => {
    console.log('Mount 和 Update 我都会走')
  })

  // 设置依赖项，当依赖项改变的时候触发更新
  useEffect(() => {
    console.log(`开始监听 ${friendId} 在线状态`)

    // 特别注意 ！！！

    // 此处并不完全等同于 WillUnMount
    // effect 函数执行的时候，即更新的时候，也会执行结束监听

    // 总结：
    // 1. 如果参数传递的是 []，初始化执行一次，返回的函数在组件销毁时执行一次
    // 2. 如果参数不传递或者类似 [a, b]，返回的函数，会在下一次 effect 执行之前，被执行

    // UnMount
    return () => {
      console.log(`结束监听 ${friendId} 在线状态`)
    }
  }, [friendId])

  return (
    <div>
      好友 {friendId} 在线状态：{status.toString()}
      <br/>
      <button onClick={() => setStatus(!status)}>friendIdChange</button>
    </div>
  )
}

export default FriendStatus
