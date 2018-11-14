'use strict'

const validate = require('./_validate')
const create = require('./_create')
const update = require('./_update')

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
  static async create (payload) {
    return create(payload)
  }

  /**
   * @alias update
   */
  static async update (payload, requestInstance, authUser) {
    return update(payload, requestInstance, authUser)
  }
}

module.exports = CreateInterface
