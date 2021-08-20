import React from 'react'
import ThemeContext from './config'
import ThemedButton from './ThemedButton'
import ThemeLink from './ThemeLink'

// 中间的组件不必指明往下传递 theme 了
function Toolbar() {
  return (
    <div>
      <ThemedButton />
      <ThemeLink />
    </div>
  )
}

class ContextTest extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        theme: 'light',
      },
    }
  }

  changeTheme = () => {
    this.setState({
      data: { theme: this.state.data.theme === 'light' ? 'dark' : 'light' }
    })
  }

  render() {
    return (
      // 使用创建的生产者，用 value 传输数据
      <ThemeContext.Provider value={this.state.data}>
        <Toolbar />
        <button onClick={this.changeTheme}>change theme</button>
      </ThemeContext.Provider>
    )
  }
}

export default ContextTest
