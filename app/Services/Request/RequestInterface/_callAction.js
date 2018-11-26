'use strict'

const ActionError = require('../ActionsInterface/ext/ActionError')
const ActionsInterface = require('../ActionsInterface')

const Database = use('Database')
const Logger = use('Logger')

/**
 * Retorna uma função para chamar as actions.
 *
 * @param  {string} actionAlias
 * @return {function}
 */
module.exports = function callAction (executeOn = null) {
  /**
   * Função para chamar as actions em si.
   *
   * @param  {any} params
   * @return {Promise<boolean>}
   */
  return async function caller (params) {
    let actions

    try {
      actions = await getActions(params.payload.type_id, executeOn)
    } catch (e) {
      throw new TypeError('Tipo não definido no payload.')
    }

    try {
      // Executa cada ação individualmente:
      for (const action of actions) {
        const actionInterface = new ActionsInterface()
        actionInterface.use(params)
        await actionInterface.execute(action)
      }
    } catch (error) {
      // Mostre a mensagem somente se for um erro do membro do Centro de
      // Recursos Humanos (ActionError) e se existir uma mensagem.
      //
      // [Nota] O erro abaixo não precisa ser levado ao log, já que é
      // meramente usado para impedir que a ação seja salva, isto é, foi
      // um erro do membro do CRH, e não do System.
      if (error instanceof ActionError && !!error.message) {
        throw error
      }

      // Criar um log para análise posterior do erro.
      Logger.crit(
        `[CRH] Erro em [[RequestInterface.${executeOn}]] :: ${error.message} | ` +
        `${params.authUser.username ? `Usuário: ${params.authUser.username}` : ''}`
      )

      // Como o erro é inesperado, não queremos que uma mensagem de erro
      // do servidor seja levada ao cliente, já que isso pode trazer
      // riscos para a segurança do site.
      throw new Error('Houve um erro ao tentar executar essa operação. Tente novamente.')
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
