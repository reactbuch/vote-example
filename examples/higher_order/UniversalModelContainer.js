import React from 'react';


// https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775

const UniversalModelContainer = WrappedComponent => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {model: this.props.model};
  }

  updateModel(eventOrValue) {
    const oldValue = this.state.model;
    const newValue = eventOrValue.target && eventOrValue.target.value || eventOrValue;
    this.setState({model: newValue});
    if (this.props.log) {
      console.log(`Model changed from ${oldValue} to ${newValue}`)
    }
  }

  render() {
    return <WrappedComponent {...this.props}
      model={this.state.model}
      updateModel={this.updateModel.bind(this)}/>;
  }

};

export default UniversalModelContainer;
