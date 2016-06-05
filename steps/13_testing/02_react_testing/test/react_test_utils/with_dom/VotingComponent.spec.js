import expect from 'expect';
import jsdom from 'mocha-jsdom';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import VotingComponent from '../../../src/common/components/VotingComponent';
import ChoiceBar from '../../../src/common/components/ChoiceBar';
import vote from '../../fixtures/convertedVote';

describe('VotingComponent', () => {
  jsdom();
  let props, expectedTitles;
  beforeEach(() => {
    props = {
      vote:             vote,
      onRegisterChoice: expect.createSpy(), // only needed to satisfy VotingComponents API
      onDismissVote:    expect.createSpy()
    };
    expectedTitles = vote.choices.map((vote) => vote.title);
  });

  it('properly renders', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <VotingComponent {...props}/>
    );
    expect(ReactTestUtils.isCompositeComponentWithType(component, VotingComponent)).toExist('Result should be a VotingComponent');
    const choiceComponents = ReactTestUtils.findAllInRenderedTree(component, (component) => ReactTestUtils.isCompositeComponentWithType(component, ChoiceBar));
    expect(choiceComponents.length).toEqual(3);
    const renderedTitles = choiceComponents.map((choice) => choice.props.title);
    expect(renderedTitles).toEqual(expectedTitles);
  });

  it('routes to main on dismiss', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <VotingComponent {...props}/>
    );
    const dismissButton = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'Button');
    ReactTestUtils.Simulate.click(dismissButton);
    expect(props.onDismissVote.calls.length).toBe(1);
    // problem: do we want to render all the choices as well? They play no role in this test
  });
});
