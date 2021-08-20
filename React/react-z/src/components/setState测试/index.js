import React from 'react';
import SetStateCombine from './state合并';
import SetStateAsyn from './state异步';

class StateTest extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <SetStateCombine />
        <hr/>
        <SetStateAsyn />
      </div>
    );
  }
}

export default StateTest;
