function split(str) {
  return str.split(' ').map(item => item.trim());
}

/**
 * Returns a boolean indicating whether the given element has the given class name
 *
 * @param {Element} el        The element
 * @param {String}  className One or more space separated class names
 * @returns {boolean}
 */
export function cssHasClass(el, className) {
  const classNames = split(className);
  for (let i = 0; i < classNames.length; i++) {
    if (el.className.match(new RegExp(`(\\s|^)${classNames[i]}(\\s|$)`))) {
      return true;
    }
  }

  return false;
}

/**
 * Adds the given class name to the given element
 *
 * @param {Element} el        The element
 * @param {String}  className One or more space separated class names
 * @returns {String}
 */
export function cssAddClass(el, className) {
  const classNames = split(className);
  for (let i = 0; i < classNames.length; i++) {
    if (!cssHasClass(el, classNames[i])) {
      el.className = `${el.className} ${classNames[i]}`;
    }
  }

  return el.className;
}

/**
 * Removes the given class name to the given element
 *
 * @param {Element} el        The element
 * @param {String}  className One or more space separated class names
 * @returns {String}
 */
export function cssRemoveClass(el, className) {
  const classNames = split(className);
  for (let i = 0; i < classNames.length; i++) {
    const reg = new RegExp(`(\\s|^)${classNames[i]}(\\s|$)`);
    el.className = el.className.replace(reg, '').trim();
  }

  return el.className;
}
