/**
 * Performs a key comparison between two objects, deleting from the first where
 * the keys exist in the second
 *
 * Can be used to remove unwanted component prop values. For example:
 *
 * ```jsx
 * render() {
 *   const { children, className, ...props } = this.props;
 *
 *    return (
 *      <div
 *        {...objectKeyFilter(props, Item.propTypes)}
 *        className={classNames('dp-item', className)}
 *       >
 *        {children}
 *      </div>
 *    )
 * }
 * ```
 *
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {*}
 */
export function objectKeyFilter(obj1, obj2) {
  const obj2Keys = Object.keys(obj2);
  const newProps = Object.assign({}, obj1);
  Object.keys(newProps)
    .filter(key => obj2Keys.indexOf(key) !== -1)
    .forEach(key => delete newProps[key]);

  return newProps;
}

/**
 * Iterates over an object
 *
 * Calls the given callback function with each value and key in the object. The callback
 * receives the value as the first argument, and key as the second.
 *
 * @param {object} obj The object to iterate over
 * @param {function} cb The callback function
 * @return {object}
 */
export function objectForEach(obj, cb) {
  const newObj = Object.assign({}, obj);
  for (let key of Object.keys(newObj)) { // eslint-disable-line
    cb(newObj[key], key);
  }

  return newObj;
}

/**
 * Object.assign() polyfill
 *
 * @param target
 * @param varArgs
 * @returns {*}
 */
export function objectAssign(target, ...varArgs) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  const to = Object(target);
  for (let index = 0; index < varArgs.length; index++) {
    const nextSource = varArgs[index];
    if (nextSource != null) {
      for (let nextKey in nextSource) { // eslint-disable-line
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }

  return to;
}
