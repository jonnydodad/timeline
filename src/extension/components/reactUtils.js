
import React from 'react';

const [major, minor] = React.version.split('.');
const versionHigherThanThirteen = Number(minor) > 13 || Number(major) > 13;

export const isReactDOMSupported = () => versionHigherThanThirteen;

/**
 * Support React 0.13 and greater where refs are React components, not DOM
 * nodes.
 * @param {*} ref React's ref.
 * @returns {Element} DOM element.
 */
export const getDOMNode = ref => {
  if (!isReactDOMSupported()) {
    return ref && ref.getDOMNode();
  }
  return ref;
};

const USED_MESSAGES = {};
const HIDDEN_PROCESSES = {
  test: true,
  production: true
};

*
 * Warn the user about something
 * @param {String} message - the message to be shown
 * @param {Boolean} onlyShowMessageOnce - whether or not we allow the
 - message to be show multiple times
 
export function warning(message, onlyShowMessageOnce = false) {
  /* eslint-disable no-undef, no-process-env */
  if (global.process && HIDDEN_PROCESSES[process.env.NODE_ENV]) {
    return;
  }
  /* eslint-enable no-undef, no-process-env */
  if (!onlyShowMessageOnce || !USED_MESSAGES[message]) {
    /* eslint-disable no-console */
    console.warn(message);
    /* eslint-enable no-console */
    USED_MESSAGES[message] = true;
  }
}

/**
 * Convience wrapper for warning
 * @param {String} message - the message to be shown
 */
export function warnOnce(message) {
  warning(message, true);
}
