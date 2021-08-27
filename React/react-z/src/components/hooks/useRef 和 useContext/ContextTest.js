import React, { useState, useContext } from 'react'

// 主题颜色
const themes = {
  light: {
    foreground: '#000',
    background: '#eee'
  },
  dark: {
    foreground: '#fff',
    background: '#222'
  }
}

// 创建 Context
const ThemeContext = React.createContext(themes.light) // 初始值

function ThemeButton() {
  const theme = useContext(ThemeContext)

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      hello world
    </button>
  )
}

function Toolbar() {
  return <div>
    <ThemeButton/>
  </div>
}

function ContextTest() {
  const [theme, setTheme] = useState(themes.dark);

  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar/>
      <button onClick={() => setTheme(theme === themes.dark ? themes.light : themes.dark)}>Change Color</button>
    </ThemeContext.Provider>
  )
}

export default ContextTest
