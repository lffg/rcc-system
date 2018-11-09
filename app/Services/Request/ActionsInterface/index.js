'use strict'

const { join } = require('path')

const RequestController = use('App/Models/RequestController')
const RequestReview = use('App/Models/RequestReview')
const RequestType = use('App/Models/RequestType')

/**
 * Interface responsável por executar as actions de um determinado tipo
 * de requisição.
 * Executa uma ou mais actions por instância.
 */
class ActionsInterface {
  constructor () {
    this._controller = null
    this._review = null
    this._type = null

    this._payload = null
  }

  /**
   * Seta as propriedades a serem usadas pelas actions.
   *
   * @param  {object}
   * @return {void}
   */
  use ({
    controller = null,
    review = null,
    type = null,
    payload = null,
    systemAction = false
  }) {
    if (
      (controller !== null && !(controller instanceof RequestController)) ||
      (review !== null && !(review instanceof RequestReview)) ||
      (type !== null && !(type instanceof RequestType))
    ) {
      throw new TypeError('Tipo inválido.')
    }

    this._controller = controller
    this._review = review
    this._type = type
    this._payload = payload
    this._systemAction = systemAction
  }

  /**
   * Executa a action passada no primeiro parâmetro.
   *
   * @param  {string} actionName
   * @return {Promise<any>}
   */
  async execute (actionName) {
    let action

    try {
      action = require(join(__dirname, 'actions', `${actionName}.js`))
    } catch (error) {
      if (error.code === 'MODULE_NOT_FOUND') {
        throw new Error(`Função (RequestAction) ${actionName} não encontrada no diretório das ações.`)
      }

      throw error
    }

    const actionMeta = action()
    this._checkMeta(actionName, actionMeta)

    const result = await actionMeta.caller({
      controller: this._controller,
      review: this._review,
      type: this._type,
      payload: this._payload,
      systemAction: this._systemAction
    })

    return result
  }

  _checkMeta (actionName, { requiresController, requiresReview, requiresType }) {
    if (requiresController && !this._controller) {
      throw new Error(`Ação ${actionName} espera uma instância "RequestController" que não foi passada.`)
    }

    if (requiresReview && !this._review) {
      throw new Error(`Ação ${actionName} espera uma instâcnia "RequestReview" que não foi passada.`)
    }

    if (requiresType && !this._type) {
      throw new Error(`Ação ${actionName} espera uma instância "RequestType" que não foi passada.`)
    }

    if (!this._payload) {
      throw new Error(`Ação ${actionName} espera um payload que não foi passado.`)
    }
  }
}

module.exports = ActionsInterface
