/* eslint-disable react/jsx-filename-extension */
import React     from 'react';
import TestUtils from 'react-dom/test-utils';
import Markmirror from '../../src/js/components/markmirror';

describe('Markmirror', () => {
  it('contains a toolbar', () => {
    const c = TestUtils.renderIntoDocument(
      <Markmirror value="Foo" />
    );

    const found = TestUtils.scryRenderedDOMComponentsWithClass(c, 'markmirror__toolbar');
    expect(found.length).toBe(1);
  });

  it('contains default buttons', () => {
    const c = TestUtils.renderIntoDocument(
      <Markmirror value="Foo" />
    );

    const buttons = [
      'markmirror__button--h1',
      'markmirror__button--h2',
      'markmirror__button--h3',
      'markmirror__button--bold',
      'markmirror__button--italic',
      'markmirror__button--oList',
      'markmirror__button--uList',
      'markmirror__button--quote',
      'markmirror__button--link',
      'markmirror__button--image'
    ];
    buttons.forEach((className) => {
      const found = TestUtils.scryRenderedDOMComponentsWithClass(c, className);
      expect(found.length).toBe(1);
    });
  });
});
