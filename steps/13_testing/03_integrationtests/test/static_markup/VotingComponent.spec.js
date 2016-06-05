import expect from 'expect';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import VotingComponent from '../../src/common/components/VotingComponent';
import vote from '../fixtures/convertedVote';

describe('VotingComponent', () => {
  let props;
  beforeEach(() => {
    props = {
      vote:             vote,
      onRegisterChoice: expect.createSpy(), // only needed to satisfy VotingComponents API
      onDismissVote:    expect.createSpy()
    };
  });

  it('properly renders static markup', () => {
    const result = renderToStaticMarkup(<VotingComponent {...props}/>);
    expect(result).toBe('<div class="Row VotingRow Spacer"><div class="Head"><h1 class="Title">How is your day?<div class="Badge">20 Votes</div></h1><div class="Description Emphasis">Tell me: how has your day been so far?</div></div><div><div class="ChoiceBar"><div class="Progress" style="width:35%;"><div class="ChoiceBarTitle">Good</div></div><div class="ChoiceBarBadge">7</div></div><div class="ChoiceBar"><div class="Progress" style="width:60%;"><div class="ChoiceBarTitle">Bad</div></div><div class="ChoiceBarBadge">12</div></div><div class="ChoiceBar"><div class="Progress" style="width:5%;"><div class="ChoiceBarTitle">Not sure yet</div></div><div class="ChoiceBarBadge">1</div></div></div><div class="ButtonBar"><div class="Button">Vote later</div></div></div>');
    // problem: what is the essence of this test? this breaks easily, we need more abstraction
  });
});
