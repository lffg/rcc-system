'use strict'

const { LogicalException } = use('@adonisjs/generic-exceptions')

class ActionError extends LogicalException {
  constructor (message, ...args) {
    super(message, ...args)
    this.message = message
  }
}

module.exports = ActionError
