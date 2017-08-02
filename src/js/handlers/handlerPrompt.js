/**
 * Link and image handler using the browser prompt
 *
 * @param {String} type One of 'image' or 'link'
 * @param {String} title Prompt title. i18n prop
 * @returns {Promise}
 */
export default function handlerPrompt(type, title) {
  return new Promise((resolve) => {
    resolve(prompt(title)); // eslint-disable-line no-alert
  });
}
