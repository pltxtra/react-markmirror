import * as mime from '../../src/js/utils/mime';

test('mimeIsMatch', () => {
  const data = [
    ['image', 'image', true],
    ['image', 'IMAGE', true],
    ['IMAGE', 'image', true],
    ['image', 'video', false],
    ['video', 'image', false],
    ['image/jpg', 'image', true],
    ['image', 'image/jpg', true],
    ['image/jpg', 'image/jpg', true],
    ['image/jpg', 'image/jpeg', true],
    ['image/jpeg', 'image/jpg', true],
    ['video/mpeg', 'image/jpg', false]
  ];

  data.forEach((d) => {
    expect(mime.mimeIsMatch(d[0], d[1])).toBe(d[2]);
  });
});
