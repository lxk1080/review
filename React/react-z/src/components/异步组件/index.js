import React from 'react'

// 也是用 import，然后用 React.lazy 包起来
const AComponent = React.lazy(() => import('./AComponent'))

class AsyncLoading extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return <div>
      <p>引入一个动态组件</p>
      <hr />
      {/* React.Suspense fallback 用来显示异步组件加载完成之前的界面 */}
      <React.Suspense fallback={<div>Loading...</div>}>
        <AComponent />
      </React.Suspense>
    </div>

    // 1. 强制刷新，可看到 loading...（看不到就限制一下 chrome 网速，用 Fast 3G 试试）
    // 2. 看 network 的 js 加载
  }
}

export default AsyncLoading
