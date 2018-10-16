'use strict'

const { join } = require('path')

const RequestController = use('App/Models/RequestController')
const RequestType = use('App/Models/RequestType')

/**
 * Classe que é utilizada para gerenciar as ações dos requerimentos.
 * Para que seja funcional, deve prover, através dos setters, as
 * instâncias do `RequestController` e `RequestType` que serão usados.
 */
class ActionsManager {
  /**
   * Construtor da classe. Usado para definir as propriedades
   * iniciais.
   * Joga um erro se as propriedades obrigatórias não forem passadas.
   *
   * @constructor
   * @throws {Error}
   */
  constructor (context = null, controller = null, type = null) {
    this._type = type
    this._context = context
    this._controller = controller

    if (!(this._controller instanceof RequestController)) {
      throw new TypeError('Controller passado para `ActionsManager` deve ser uma instância de `RequestController`')
    }

    if (!(this._type instanceof RequestType)) {
      throw new TypeError('Tipo passado para `ActionsManager` deve ser uma instância de `RequestType`')
    }

    if (!this._context) {
      throw new Error('O atributo `context` é obrigatório para a classe `ActionsManager`')
    }
  }

  /**
   * Executa uma action se encontrar.
   * Caso o caminho da action não seja especificado, ou a action não
   * exista, um erro será lançado.
   *
   * @param  {string} actionName
   * @throws {Error}
   * @return {boolean|void}
   */
  async execute (actionName = '') {
    let action

    try {
      action = require(join(__dirname, 'Actions', `${actionName}.js`))
    } catch (e) {
      throw new Error(`Função (RequestAction) ${actionName} não encontrada no diretório das ações.`)
    }

    try {
      await action(this._context, this._controller, this._type)
    } catch (e) {
      throw e
    }
  }
}

module.exports = ActionsManager
