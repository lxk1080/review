import React from 'react'

class AComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: 'haha'
    }
  }

  render() {
    return (
      <div>
        我是通过异步加载出来的内容 {this.state.message}
      </div>
    )
  }
}

export default AComponent
