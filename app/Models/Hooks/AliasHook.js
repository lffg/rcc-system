const shortid = require('shortid');

const AliasHook = (exports = module.exports = {});

/**
 * Gera um alias único para o grupo a ser criado.
 *
 * @param {object} groupInstance
 */
AliasHook.generateAlias = (groupInstance) => {
  if (groupInstance.is_permanent && !groupInstance.alias) {
    throw new Error(
      'Alias (campo obrigatório) não informado para o grupo permanente.'
    );
  }

  if (!groupInstance.alias) {
    groupInstance.alias = `ALIAS-${shortid.generate()}`;
  }
};
