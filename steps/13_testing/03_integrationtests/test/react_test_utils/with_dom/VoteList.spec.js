import expect from 'expect';
import jsdom from 'mocha-jsdom';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import VoteList from '../../../src/common/components/VoteList';
import VoteSummary from '../../../src/common/components/VoteSummary';
import votes from '../../fixtures/convertedVotes';
import createHistory from 'history/lib/createMemoryHistory';
import {Link,Route, Router} from 'react-router'

describe('VoteList', () => {
  jsdom();
  let props;
  beforeEach(() => {
    props = {
      allVotes: votes
    };
  });
  it('properly renders', () => {
    const Wrapper = React.createClass({
      render () {
        return <VoteList {...props}/>;
      }
    });

    const history = createHistory('/');
    const tree = ReactTestUtils.renderIntoDocument(
      <Router history={history}>
        <Route path="/" component={Wrapper}/>
      </Router>
    );
    const summaries = ReactTestUtils.findAllInRenderedTree(tree, (component) => ReactTestUtils.isCompositeComponentWithType(component, VoteSummary));
    expect(summaries.length).toEqual(3);
    const expectedTitles = votes.map((vote) => vote.title);
    const renderedTitles = summaries.map((child) => child.props.vote.title);
    expect(renderedTitles).toEqual(expectedTitles);
  });

});
