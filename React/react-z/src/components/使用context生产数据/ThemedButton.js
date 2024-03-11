import React from 'react';
import ThemeContext from "./config";

// 底层组件 - class 组件
class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context
  // 也可以在 class 外写 ThemedButton.contextType = ThemeContext
  // 注意这一句是一定要写的，不止是定义个类型那么简单，如果不写，就拿不到值
  static contextType = ThemeContext

  render() {
    // React 会往上找到 theme Provider，然后使用它的值
    const data = this.context

    return <div>
      <p>button's theme is {data.theme}</p>
    </div>
  }
}

export default ThemedButton
