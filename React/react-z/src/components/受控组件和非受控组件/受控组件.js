import React from 'react'

class Controllered extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '亚索',
      info: '个人信息',
      city: '峡谷',
      flag: true,
      gender: 'male'
    }
  }

  onInputChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  onTextareaChange = (e) => {
    this.setState({
      info: e.target.value
    })
  }

  onSelectChange = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  onCheckboxChange = () => {
    this.setState({
      flag: !this.state.flag
    })
  }

  onRadioChange = (e) => {
    this.setState({
      gender: e.target.value
    })
  }

  render() {
    return (
      <div>
        <div>
          <p>{this.state.name}</p>
          <label htmlFor="inputName">姓名：</label> {/* 用 htmlFor 代替 for */}
          <input id="inputName" value={this.state.name} onChange={this.onInputChange}/>
        </div>

        <div>
          <textarea value={this.state.info} onChange={this.onTextareaChange}/>
          <p>{this.state.info}</p>
        </div>

        <div>
          <select value={this.state.city} onChange={this.onSelectChange}>
            <option value="beijing">北京</option>
            <option value="shanghai">上海</option>
            <option value="shenzhen">深圳</option>
          </select>
          <p>{this.state.city}</p>
        </div>

        <div>
          <input type="checkbox" checked={this.state.flag} onChange={this.onCheckboxChange}/>
          <p>{this.state.flag.toString()}</p>
        </div>

        <div>
          male <input type="radio" name="gender" value="male" checked={this.state.gender === 'male'} onChange={this.onRadioChange}/>
          female <input type="radio" name="gender" value="female" checked={this.state.gender === 'female'} onChange={this.onRadioChange}/>
          <p>{this.state.gender}</p>
        </div>
      </div>
    )
  }
}

export default Controllered;
