import React from 'react'
import PropTypes from 'prop-types'

/**
 * 定义了 Mouse 组件，只有提供和更新 x y 的能力
 * 至于 Mouse 组件如何渲染，RenderPropsTest 说了算，通过 render prop 的方式告诉 Mouse
 */

class Mouse extends React.Component {
  static propTypes = {
    render: PropTypes.func.isRequired // 必须接收一个 render 属性，而且是函数
  }

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

        {/* 将当前 state 作为 props ，传递给 render （render 是一个函数组件） */}
        {this.props.render(this.state)}
      </div>
    )
  }
}

const RenderPropsTest = (props) => (
  <div>
    {/* render 是一个函数组件，name 属性是组件自身的 */}
    <Mouse render={({ x, y }) => (
      <div>
        <h1>The mouse position is ({x}, {y})</h1>
        <p>I am {props.name}</p>
      </div>
    )}/>
  </div>
)

export default RenderPropsTest
