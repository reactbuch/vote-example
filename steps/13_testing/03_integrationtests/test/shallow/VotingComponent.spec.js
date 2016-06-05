import expect from 'expect';
import jsdom from 'mocha-jsdom';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import VotingComponent from '../../src/common/components/VotingComponent';
import ChoiceBar from '../../src/common/components/ChoiceBar';
import vote from '../fixtures/convertedVote';

describe('VotingComponent', () => {
  let props, expectedTitles;
  beforeEach(() => {
    props = {
      vote:             vote,
      onRegisterChoice: expect.createSpy(), // only needed to satisfy VotingComponents API
      onDismissVote:    expect.createSpy()
    };
    expectedTitles = vote.choices.map((vote) => vote.title);
  });

  it('properly renders shallow', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(
      <VotingComponent {...props}/>
    );
    const tree = renderer.getRenderOutput();
    //    console.log(JSON.stringify(tree, null, '  '));
    expect(tree.type).toBe('div');
    expect(tree.props.children.length).toEqual(3); // head, choices, button bar

    const choices = tree.props.children[1];
    expect(choices.type).toBe('div');
    expect(choices.props.children.length).toEqual(3);
    const renderedChoiceTitles = choices.props.children.map((choice) => choice.props.title);
    expect(renderedChoiceTitles).toEqual(expectedTitles);
    // problem: this is brittle, choices have to be at index 1 of children
  });

  it('routes to main on dismiss shallow', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(
      <VotingComponent {...props}/>
    );
    const tree = renderer.getRenderOutput();
    const buttonBar = tree.props.children[2];
    const dismissButton = buttonBar.props.children;
    dismissButton.props.onClick();
    expect(props.onDismissVote.calls.length).toBe(1);
    // problem: this works, but the path can be tricky, plus it is brittle, plus we are not triggering the event,
    // but directly triggering the passed property
  });
});
