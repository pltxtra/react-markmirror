import * as css from '../../src/js/utils/css';

test('cssHasClass', () => {
  const element = {
    className: 'rmw-editor rmw-toolbar__button rmw-toolbar--active  foo'
  };

  expect(css.cssHasClass(element, 'rmw-editor')).toBeTruthy();
  expect(css.cssHasClass(element, 'rmw-toolbar__button')).toBeTruthy();
  expect(css.cssHasClass(element, 'rmw-toolbar--active')).toBeTruthy();
  expect(css.cssHasClass(element, 'rmw-editor bar')).toBeTruthy();
  expect(css.cssHasClass(element, 'foo')).toBeTruthy();
  expect(css.cssHasClass(element, 'editor')).not.toBeTruthy();
  expect(css.cssHasClass(element, 'editor bar')).not.toBeTruthy();
});

test('cssAddClass', () => {
  const element = {
    className: 'rmw-editor rmw-editor--active  foo'
  };

  expect(
    css.cssAddClass(element, 'rmw-editor rmw-toolbar--active')
  ).toBe('rmw-editor rmw-editor--active  foo rmw-toolbar--active');
});

test('cssRemoveClass', () => {
  const element = {
    className: 'rmw-editor rmw-editor--active rmw-toolbar__button rmw-toolbar--active  foo'
  };

  expect(
    css.cssRemoveClass(element, 'rmw-editor rmw-toolbar--active')
  ).toBe('rmw-editor--active rmw-toolbar__button foo');
  expect(element.className).toBe('rmw-editor--active rmw-toolbar__button foo');
});
