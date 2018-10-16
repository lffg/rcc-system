'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions')

class Request extends HttpException {
  constructor (message, status, path, code, link) {
    super(message, status, code, link)

    this.path = path
  }

  /**
   * Lida com os erros.
   *
   * @param  {object} error
   * @param  {object} ctx
   * @return {Promise<any>}
   */
  async handle ({ message }, { response, session }) {
    session.flash({ danger: message || this.messages['E_DEFAULT'] })
    await session.commit()
    return response.redirect(this.path || 'back')
  }
}

module.exports = Request
