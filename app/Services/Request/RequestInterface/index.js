'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions')

exports.validate = async function(step, payload) {
  if (![1, 2, 3].includes(parseInt(step))) {
    throw new HttpException(
      `Parte inválida (${step}) para validação de requisição.`
    )
  }

  return require('./_validate')(parseInt(step), payload)
}

const callAction = require('./_callAction')

// *:
exports.create = async (...params) => callAction('CREATE')(...params)
exports.update = async (...params) => callAction('UPDATE')(...params)

// CRH:
exports.reject = async (...params) => callAction('REJECT')(...params)
exports.approve = async (...params) => callAction('APPROVE')(...params)
