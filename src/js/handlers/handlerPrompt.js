/**
 * Link and image handler using the browser prompt
 *
 * @param {String} type One of 'image' or 'link'
 * @returns {Promise}
 */
export default function handlerPrompt(type) {
  return new Promise((resolve) => {
    const text = (type === 'image') ? 'Image URL' : 'Link URL';
    resolve(prompt(text)); // eslint-disable-line no-alert
  });
}
