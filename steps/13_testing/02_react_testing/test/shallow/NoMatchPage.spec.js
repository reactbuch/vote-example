import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import NoMatchPage from '../../src/common/containers/NoMatchPage';

describe('NoMatchPage', () => {
  it('properly renders', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(
      <NoMatchPage/>
    );
    const result = renderer.getRenderOutput();
    expect(result.type).toBe('div');
    expect(result.props.children).toEqual('Page not found');
  });

});
