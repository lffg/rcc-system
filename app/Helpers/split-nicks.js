'use strict'

module.exports = splitNicks

/**
 * Divide uma string de nicks, que serão divididos através do caractere
 * de barra simples (/) ou invertida (\).
 *
 * @param  {string} nicks
 * @param  {boolean} onlyEntries
 * @return {{ entries: string[], string: string }|string[]}
 */
function splitNicks (nicks = '', onlyEntries = false) {
  // Divide a string:
  const splitedNicks = nicks
    .split(/\\|\//)
    .map((s) => s.trim())
    .filter((s) => /\S/.test(s))

  // Remove repetições:
  const entries = [...new Set(splitedNicks)]

  if (onlyEntries) return entries

  return {
    entries, string: entries.join(' / ')
  }
}
