'use strict'

const create = require('./_create')
const validate = require('./_validate')

const { HttpException } = use('@adonisjs/generic-exceptions')

class CreateInterface {
  /**
   * @alias validate
   */
  static async validate (step, payload) {
    if (![1, 2, 3].includes(parseInt(step))) {
      throw new HttpException(`Parte inválida (${step}) para validação de requisição.`)
    }

    return validate(parseInt(step), payload)
  }

  /**
   * @alias create
   */
  static async create (controllerId, typeId, payload) {
    return create(controllerId, typeId, payload)
  }
}

module.exports = CreateInterface
