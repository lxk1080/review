
import React from 'react'

// 创建 Context 填入默认值
// 这个默认值是可有可无的
const ThemeContext = React.createContext({ theme: 'light' })

export default ThemeContext
