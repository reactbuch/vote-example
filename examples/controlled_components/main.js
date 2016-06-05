// React
import React from 'react';
import ReactDOM from 'react-dom';

class Controller extends React.Component {
  constructor() {
    super();
    this.state = {
      currentText:        'Hello',
      currentTextArea:    'First Line\nSecond Line',
      check:              true,
      radioCheck:         true,
      currentSelect:      'b',
      currentMultiSelect: ['b', 'c', 'a'],
      uncontrolledText:   null
    };
  }

  render() {

    //  <input type='text' value={this.state.currentValue} onChange={(e)=>this.setState({currentValue:e.target.value})}/>
    return <div>

      <input type='text'
             value={this.state.currentText}
             onChange={(e)=>this.setState({currentText: e.target.value })}
      />

      <textarea value={this.state.currentTextArea}
                onChange={ e => this.setState({currentTextArea: e.target.value })}
      />

      <input type='radio'
             checked={this.state.radioCheck}
             onChange={e => this.setState({radioCheck: !this.state.radioCheck})}
      />

      <input type='checkbox'
             checked={this.state.check}
             onChange={(e)=> { this.setState({check:e.target.checked}); }}
      />

      <select value={this.state.currentSelect}
              onChange={e => this.setState({currentSelect: e.target.value})}>
        <option value='a'>A</option>
        <option value='b'>B</option>
        <option value='c'>C</option>
      </select>

      <select value={this.state.currentMultiSelect}
              multiple={true}
              required={false}
              onChange={e => {
                console.dir(e.target.options);
                this.setState(
                  {currentMultiSelect: [...e.target.options].filter(o => o.selected).map(o => o.value)});
              }}>
        <option value='a'>A</option>
        <option value='b'>B</option>
        <option value='c'>C</option>
      </select>


      <input type='text' ref='uncontrolled' onBlur={e=>this.setState({uncontrolledText: e.target.value})}/>
      Eingegebener text: {this.state.uncontrolledText}
      <button onClick={()=>console.log(this.refs.uncontrolled.value)}>Text ausgeben</button>

    </div>;
  }
}

// Render application
ReactDOM.render(
  <Controller />,
  document.getElementById('examplesMountPoint')
);






