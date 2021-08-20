import React from 'react';

class SetStateAsyn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  // 1、直接使用是异步的
  btnClick1 = () => {
    this.setState({
      count: this.state.count + 1
    }, () => {
      // 回调函数中可以拿到最新的 state
      console.log('count by callback', this.state.count)
    })
    // 异步的，拿不到最新值
    console.log('count', this.state.count)
  }

  // 2、setTimeout 中 setState 是同步的
  btnClick2 = () => {
    setTimeout(() => {
      this.setState({
        count: this.state.count + 1
      })
      console.log('count in setTimeout', this.state.count)
    }, 0)
  }

  // 3、自己定义的 DOM 事件，setState 是同步的
  componentDidMount() {
    document.getElementById('btn3').addEventListener('click', this.bodyClickHandler)
  }

  bodyClickHandler = () => {
    this.setState({
      count: this.state.count + 1
    })
    console.log('count in body event', this.state.count)
  }

  render() {
    const { count } = this.state;

    return (
      <div>
        <div>state异步</div>
        <div>{count}</div>
        <button onClick={this.btnClick1}>点我1</button>
        <button onClick={this.btnClick2}>点我2</button>
        <button id="btn3">点我3</button>
      </div>
    );
  }
}

export default SetStateAsyn;
