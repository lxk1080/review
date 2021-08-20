import React from 'react';

class SetStateCombine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  // 1、使用 prevState
  btnClick1 = () => {
    this.setState((prevState) => {
      return {
        count: prevState.count + 1
      }
    })
    this.setState((prevState) => {
      return {
        count: prevState.count + 1
      }
    })
    this.setState((prevState) => {
      return {
        count: prevState.count + 1
      }
    })
  }

  // 2、使用 this.state
  btnClick2 = () => {
    this.setState(() => {
      return {
        count: this.state.count + 1
      }
    })
    this.setState(() => {
      return {
        count: this.state.count + 1
      }
    })
    this.setState(() => {
      return {
        count: this.state.count + 1
      }
    })
  }

  render() {
    const { count } = this.state;

    return (
      <div>
        <div>state合并</div>
        <div>{count}</div>
        <button onClick={this.btnClick1}>点我1</button>
        <button onClick={this.btnClick2}>点我2</button>
      </div>
    );
  }
}

export default SetStateCombine;
