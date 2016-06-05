import React from 'react';
import UniversalModelContainer from './UniversalModelContainer';

class HelloMessage extends React.Component {
  render() {
    const {model, updateModel} = this.props;
    return (
      <div>
        <input ref="in"
               onChange={updateModel}
               value={model}/>
        <p>{model}, World</p>
        <button
          onClick={this.reset.bind(this)}>
          Clear
        </button>
      </div>);
  }

  reset() {
    this.props.updateModel('');
    this.refs.in.focus();
  }
}

export default UniversalModelContainer(HelloMessage);