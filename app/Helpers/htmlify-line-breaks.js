/**
 * Transforma as quebras de linha em HTML.
 *
 * @param  {string} string
 * @param  {boolean} trimString
 * @return {string|null}
 */
module.exports = function htmlifyLineBreaks(string, trimString = true) {
  if (!string) {
    return null;
  }

  if (trimString) {
    string = string.trim();
  }

  return string.split('\n').join('<br>');
};
