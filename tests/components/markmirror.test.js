/* eslint-disable react/jsx-filename-extension */
import React     from 'react';
import { mount } from 'enzyme';
import Markmirror from '../../src/js/components/markmirror';

describe('Markmirror', () => {
  it('contains a toolbar', () => {
    const wrapper = mount(<Markmirror value="Foo" />);
    expect(wrapper.find('.markmirror__toolbar').length).toBe(1);
  });

  it('contains default buttons', () => {
    const wrapper = mount(<Markmirror value="Foo" />);
    const buttons = [
      '.markmirror__button--h1',
      '.markmirror__button--h2',
      '.markmirror__button--h3',
      '.markmirror__button--bold',
      '.markmirror__button--italic',
      '.markmirror__button--oList',
      '.markmirror__button--uList',
      '.markmirror__button--quote',
      '.markmirror__button--link',
      '.markmirror__button--image'
    ];
    buttons.forEach((className) => {
      expect(wrapper.find(className).length).toBe(1);
    });
  });

  it('sets themes', () => {
    let wrapper = mount(<Markmirror value="Foo" theme="light" />);
    expect(wrapper.find('.markmirror--light-theme').length).toBe(1);
    wrapper = mount(<Markmirror value="Foo" theme="dark" />);
    expect(wrapper.find('.markmirror--dark-theme').length).toBe(1);
  });

  it('sets textarea attribs', () => {
    const wrapper = mount(<Markmirror value="Foo" name="code" />);
    expect(wrapper.find('textarea[name="code"]').length).toBe(1);
  });

  it('expands props', () => {
    const wrapper = mount(<Markmirror value="Foo" title="Markmirror" />);
    expect(wrapper.find('div.markmirror[title="Markmirror"]').length).toBe(1);
  });

  it('parses markdown', () => {
    const data = [
      ['# Header 1',                  '<span class="cm-header cm-header-1"># Header 1</span>'],
      ['## Header 2',                 '<span class="cm-header cm-header-2">## Header 2</span>'],
      ['### Header 3',                '<span class="cm-header cm-header-3">### Header 3</span>'],
      ['**bold**',                    '<span class="cm-strong">**bold**</span>'],
      ['_italic_',                    '<span class="cm-em">_italic_</span>'],
      ['> A quote',                   '<span class="cm-quote cm-quote-1">&gt; A quote</span>'],
      ['* Unordered list',            '<span class="cm-variable-2">* Unordered list</span>'],
      ['1. Ordered list',             '<span class="cm-variable-2">1. Ordered list</span>'],
      ['[Sean Hickey](https://...)',  '<span class="cm-link">[Sean Hickey]</span>'],
      ['![Pascal](https://...)',      '<span class="cm-image cm-image-alt-text cm-link">[Pascal]</span>']
    ];
    data.forEach((find) => {
      const wrapper = mount(<Markmirror value={find[0]} />);
      expect(wrapper.html().indexOf(find[1])).not.toBe(-1);
    });
  });
});
