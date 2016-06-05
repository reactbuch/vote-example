import React from 'react'

// a simple "Model" holding the current user of our app
// this model could also be provided to the ModelProvider
// by a property
const Model = {
  user: 'Peter'
};

export default class ModelProvider extends React.Component {
  getChildContext() {
    return {model: Model};
  }

  render() {
    // React.Children.only returns the only children passed to a component.
    // If there are more or no children an error is raised
    return React.Children.only(this.props.children);
  }
}

// expect exactly one single child element
ModelProvider.propTypes = {
  children: React.PropTypes.element.isRequired
};

// define the context we provide: a 'model' object containing a single optional string property 'user'
ModelProvider.childContextTypes = {
  model: React.PropTypes.shape({
    user: React.PropTypes.string
  }).isRequired
};
