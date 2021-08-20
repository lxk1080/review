
import ThemeContext from "./config";

// 底层组件 - 函数式组件
function ThemeLink () {
  // 函数式组件没有 this，可以使用 Consumer（消费者）
  // 里面包裹一个函数，参数就是 Context 的数据
  return (
    <ThemeContext.Consumer>
      { data => <p>link's theme is {data.theme}</p> }
    </ThemeContext.Consumer>
  )
}

export default ThemeLink
