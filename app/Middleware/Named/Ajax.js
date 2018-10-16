'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions')

class Ajax {
  async handle ({ request }, next) {
    if (!request.ajax()) {
      throw new HttpException('Requisição inválida.', 400)
    }

    return next()
  }
}

module.exports = Ajax
