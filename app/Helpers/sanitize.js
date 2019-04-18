const sanitizeHtml = require('sanitize-html')

/**
 * Limpa o XSS.
 *
 * @param  {string} string
 * @param  {object} options
 * @return {string}
 */
module.exports = function sanitize(
  string,
  options = {
    allowedTags: ['p', 'b', 'i', 'em', 'strong', 'a', 'br'],
    allowedAttributes: { a: ['href'] }
  }
) {
  return sanitizeHtml(string || '', options).trim()
}
