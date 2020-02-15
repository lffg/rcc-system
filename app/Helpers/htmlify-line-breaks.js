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

  return (trimString ? string.trim() : string).split('\n').join('<br />');
};
