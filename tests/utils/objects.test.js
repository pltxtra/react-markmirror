import PropTypes from 'prop-types';
import * as objects from '../../src/js/utils/objects';

test('objectKeyFilter', () => {
  const propTypes = {
    className: PropTypes.string
  };
  const props = {
    className: 'dp-item',
    title:     'foo'
  };
  const result = objects.objectKeyFilter(props, propTypes);
  expect(result.className).toBe(undefined);
  expect(result.title).not.toBe(undefined);
});

test('objectForEach', () => {
  const values = {
    name:  'item',
    title: 'foo'
  };
  const actual = {};

  objects.objectForEach(values, (val, key) => {
    actual[key] = val;
  });
  expect(actual.name).toBe('item');
  expect(actual.title).toBe('foo');
});
