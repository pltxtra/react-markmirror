/**
 * Returns a boolean value indicating whether the fullscreen API is supported
 * by the client browser
 *
 * @returns {boolean}
 */
export function isSupported() {
  if (document.exitFullscreen) {
    return true;
  } else if (document.webkitExitFullscreen) {
    return true;
  } else if (document.mozCancelFullScreen) {
    return true;
  } else if (document.msExitFullscreen) {
    return true;
  }

  return false;
}

/**
 * Returns a boolean value indicating whether an element is fullscreened
 *
 * @returns {boolean}
 */
export function isFullScreen() {
  if (document.fullscreenElement) {
    return true;
  } else if (document.webkitFullscreenElement) {
    return true;
  } else if (document.mozFullscreenElement) {
    return true;
  } else if (document.msFullscreenElement) {
    return true;
  }

  return false;
}

/**
 * Returns the current fullscreened element or null
 *
 * @returns {Element|null}
 */
export function fullscreenElement() {
  if (document.fullscreenElement) {
    return document.fullscreenElement;
  } else if (document.webkitFullscreenElement) {
    return document.webkitFullscreenElement;
  } else if (document.mozFullscreenElement) {
    return document.mozFullscreenElement;
  } else if (document.msFullscreenElement) {
    return document.msFullscreenElement;
  }

  return null;
}

/**
 * Exits fullscreen mode
 */
export function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else {
    throw new Error('Browse does not support exitFullscreen.');
  }
}

/**
 * Fullscreens the given element
 *
 * @param {Element} el
 */
export function requestFullscreen(el) {
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  } else {
    throw new Error('Browse does not support requestFullscreen.');
  }
}

/**
 * Toggles the given element into and out of fullscreen mode
 *
 * @param {Element} el
 */
export function toggleFullscreen(el) {
  if (isFullScreen()) {
    exitFullscreen();
  } else {
    requestFullscreen(el);
  }
}
