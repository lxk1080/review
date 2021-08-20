import React from 'react'

// 高阶组件，获取鼠标位置
const withMouse = (Component) => {
  class withMouseComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = { x: 0, y: 0 }
    }

    handleMouseMove = (event) => {
      this.setState({
        x: event.clientX,
        y: event.clientY
      })
    }

    render() {
      return (
        <div onMouseMove={this.handleMouseMove}>

          {/* 1. 透传所有 props 2. 增加 mouse 属性 */}
          <Component {...this.props} mouse={this.state} />
        </div>
      )
    }
  }

  return withMouseComponent
}

const HocTest = (props) => {
  const { name, mouse } = props // 接收 mouse 属性，name 属性是组件自身的
  const { x, y } = mouse

  return (
    <div>
      <h1>The mouse position is ({x}, {y})</h1>
      <p>I am {name}</p>
    </div>
  )
}

export default withMouse(HocTest) // 返回高阶函数，本质就是外面套了一层父组件
