'use strict'

const ActionsInterface = require('../ActionsInterface')

const Database = use('Database')

/**
 * Retorna uma função para chamar as actions.
 *
 * @param  {string} actionAlias
 * @return {function}
 */
module.exports = function callAction (actionAlias = null) {
  /**
   * Função para chamar as actions em si.
   *
   * @param  {any} params
   * @return {Promise<boolean>}
   */
  return async function caller (params) {
    let actions

    try {
      actions = await getActions(params.payload.type_id, actionAlias)
    } catch (e) {
      throw new TypeError('Deve-se definir "type_id" para "payload" ao usar "RequestInterface.*"')
    }

    // Execute cada ação individualmente:
    for (const action of actions) {
      const actionInterface = new ActionsInterface()
      actionInterface.use(params)
      await actionInterface.execute(action)
    }

    return true
  }
}

/**
 * Retorna todas as ações para um determinado tipo.
 *
 * @param  {number|string} typeId
 * @return {Promise<string[]>}
 */
const getActions = async (typeId, executeOn) => Database
  .select('A.alias')
  .from('request_actions as A')
  .innerJoin('pivot_request_action_type as P', 'P.action_id', '=', 'A.id')
  .innerJoin('request_types as T', 'T.id', '=', 'P.type_id')
  .where({
    'T.id': typeId,
    'A.execute_on': executeOn
  })
  .map(({ alias = null } = {}) => alias)
  .filter((alias) => alias !== null)
