'use strict'

const RequestController = use('App/Models/RequestController')
const RequestType = use('App/Models/RequestType')

/**
 * Classe que é a base para todas as demais classes relativas ao
 * funcionamento dos requerimentos.
 * É herdada por todas as subclasses.
 */
class BaseRequest {
  /**
   * Construtor da classe. Requere as instâncias do controller e do
   * tipo que serão usados. Um erro será jogado caso as instâncias
   * não forem fornecidas.
   *
   * @constructor
   * @param  {object<RequestController>} controllerInstance
   * @param  {object<RequestType>} typeInstance
   * @throws {TypeError}
   */
  constructor (controllerInstance, typeInstance) {
    if (!(controllerInstance instanceof RequestController)) {
      throw new TypeError('`controllerInstance` não é uma instância de `RequestController`.')
    }

    if (!(typeInstance instanceof RequestType)) {
      throw new TypeError('`typeInstance` não é uma instância de `RequestType`.')
    }

    this._controller = controllerInstance
    this._type = typeInstance
    this._data = {}
  }

  /**
   * Funde o objeto de data atual com o objeto passado.
   * Jogará um erro caso o parâmetro não for um objeto.
   *
   * @param  {object} data
   * @throws {TypeError}
   * @return {void}
   */
  data (data) {
    if (typeof data !== 'object') {
      throw new TypeError('`data` deve ser um objeto.')
    }

    this._data = Object.assign(this._data, data)
  }

  /**
   * Alias to data.
   *
   * @alias data
   */
  use (data) {
    this.data(data)
  }
}

module.exports = BaseRequest
