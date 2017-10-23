/**
 * Returns a boolean indicating whether the given mime types are equal
 *
 * Examples:
 *
 * ```js
 * info(mimeIsMatch('image', 'image/jpg'));       // Outputs: true
 * info(mimeIsMatch('image/jpg', 'image/jpg'));   // Outputs: true
 * info(mimeIsMatch('image/jpeg', 'image/jpg'));  // Outputs: true
 * info(mimeIsMatch('video', 'image/jpg'));       // Outputs: false
 * info(mimeIsMatch('video/mpeg', 'video/webm')); // Outputs: false
 * ```
 *
 * @param {String} mime1
 * @param {String} mime2
 * @returns {boolean}
 */
export function mimeIsMatch(mime1, mime2) {
  const mime1Parts = mime1.split('/', 2).map(v => v.toLowerCase());
  const mime2Parts = mime2.split('/', 2).map(v => v.toLowerCase());

  if (mime1Parts[0] === mime2Parts[0]) {
    if (mime1Parts.length === 1 || mime2Parts.length === 1) {
      return true;
    }
    if (mime1Parts[1] === 'jpeg') {
      mime1Parts[1] = 'jpg';
    }
    if (mime2Parts[1] === 'jpeg') {
      mime2Parts[1] = 'jpg';
    }
    return mime1Parts[1] === mime2Parts[1];
  }

  return false;
}

export function mimeTypeIsMatch(mime1, mime2) {
  const mime1Parts = mime1.split('/', 2).map(v => v.toLowerCase());
  const mime2Parts = mime2.split('/', 2).map(v => v.toLowerCase());

  if (mime1Parts[0] === mime2Parts[0]) {
    return true;
  }

  return false;
}
