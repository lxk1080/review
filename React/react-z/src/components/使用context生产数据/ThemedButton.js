import React from 'react';
import ThemeContext from "./config";

// 底层组件 - class 组件
class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context
  static contextType = ThemeContext // 也可以在 class 外写 ThemedButton.contextType = ThemeContext

  render() {
    const data = this.context // React 会往上找到 theme Provider，然后使用它的值

    return <div>
      <p>button's theme is {data.theme}</p>
    </div>
  }
}

export default ThemedButton
