import expect from 'expect';
import jsdom from 'mocha-jsdom';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactTestUtils from 'react-addons-test-utils';
import VotingComponent from '../../src/common/components/VotingComponent';
import ChoiceBar from '../../src/common/components/ChoiceBar';
import vote from '../fixtures/convertedVote';

describe('VotingComponent', () => {
  jsdom();
  let props, expectedTitles;
  beforeEach(() => {
    props = {
      vote: vote,
      onRegisterChoice: expect.createSpy(), // only needed to satisfy VotingComponents API
      onDismissVote: expect.createSpy()
    };
    expectedTitles = vote.choices.map((vote) => vote.title);
  });
  it('properly renders static markup', () => {
    const result = renderToStaticMarkup(<VotingComponent {...props}/>);
    expect(result).toBe('<div class="Row VotingRow Spacer"><div class="Head"><h1 class="Title">How is your day?<div class="Badge">20 Votes</div></h1><div class="Description Emphasis">Tell me: how has your day been so far?</div></div><div><div class="ChoiceBar"><div class="Progress" style="width:35%;"><div class="ChoiceBarTitle">Good</div></div><div class="ChoiceBarBadge">7</div></div><div class="ChoiceBar"><div class="Progress" style="width:60%;"><div class="ChoiceBarTitle">Bad</div></div><div class="ChoiceBarBadge">12</div></div><div class="ChoiceBar"><div class="Progress" style="width:5%;"><div class="ChoiceBarTitle">Not sure yet</div></div><div class="ChoiceBarBadge">1</div></div></div><div class="ButtonBar"><div class="Button">Vote later</div></div></div>');
    // problem: what is the essence of this test? this breaks easily, we need more abstraction
  });
//  http://simonsmith.io/unit-testing-react-components-without-a-dom/
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
