import React from 'react';

// FIXME
// unfortunately, if you have a stateless component, ReactTestUtils can not properly render it
// temporarily we make this an ordinary component
// need to wait until this
// https://github.com/facebook/react/issues/4913
// is released then revert to stateless component
export default class ChoiceBar extends React.Component {
  render() {
    const {title, count, percent, onClickHandler} = this.props;
    return (
      <div className="ChoiceBar" onClick={onClickHandler}>
        <div className="Progress" style={{'width': percent + '%'}}>
          <div className="ChoiceBarTitle">{title}</div>
        </div>
        <div className="ChoiceBarBadge">{count}</div>
      </div>
    );
  }
}
ChoiceBar.propTypes = {
  title:   React.PropTypes.string.isRequired,
  count:   React.PropTypes.number.isRequired,
  percent: React.PropTypes.number.isRequired
};
