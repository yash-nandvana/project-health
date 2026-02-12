import ora from 'ora';

/**
 * Create a loading spinner for CLI feedback
 * @param {string} [text] - Initial text
 * @returns {ora.Ora}
 */
export function createSpinner(text = 'Loading...') {
  return ora(text);
}
