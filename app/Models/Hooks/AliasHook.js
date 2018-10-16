'use strict'

const shortid = require('shortid')

const AliasHook = exports = module.exports = {}

/**
 * Generate an unique alias to the created group.
 *
 * @param {object} groupInstance
 */
AliasHook.generateAlias = (groupInstance) => {
  if (groupInstance.is_permanent && !groupInstance.alias) {
    throw new Error('Alias (campo obrigatório) não informado para o grupo permanente.')
  }

  if (!groupInstance.alias) {
    groupInstance.alias = `ALIAS-${shortid.generate()}`
  }
}
