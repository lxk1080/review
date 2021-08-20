import React from 'react';

class UNControllered extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '瑞文',
      flag: true,
    }

    this.nameInputRef = React.createRef() // 创建 ref
    this.fileInputRef = React.createRef()
  }

  alertName = () => {
    const elem = this.nameInputRef.current // 通过 ref 获取 DOM 节点
    alert(elem.value) // 不是 this.state.name
  }

  alertFile = () => {
    const elem = this.fileInputRef.current // 通过 ref 获取 DOM 节点
    alert(elem.files[0].name)
  }

  render() {
    return (
      <div>
        <div>
          {/* 使用 defaultValue 而不是 value ，使用 ref */}
          <input defaultValue={this.state.name} ref={this.nameInputRef}/>
          {/* state 并不会随着改变 */}
          <span>state.name: {this.state.name}</span>
          <br/>
          <button onClick={this.alertName}>alert name</button>
        </div>

        {/* 使用 defaultChecked */}
        <div>
          <input
            type="checkbox"
            defaultChecked={this.state.flag}
          />
        </div>

        {/* 使用场景之一，只能使用非受控组件 */}
        <div>
          <input type="file" ref={this.fileInputRef}/>
          <button onClick={this.alertFile}>alert file</button>
        </div>
      </div>
    )
  }
}

export default UNControllered;
