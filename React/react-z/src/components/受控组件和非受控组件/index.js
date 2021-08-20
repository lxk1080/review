import React from 'react';
import Controllered from './受控组件';
import UNControllered from './非受控组件';

class ControllerTest extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <div>
        <Controllered />
        <hr/>
        <UNControllered />
      </div>
    )
  }
}

export default ControllerTest;
