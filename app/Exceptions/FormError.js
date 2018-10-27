'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions')

class FormErrorException extends HttpException {
  /**
   * Construtor da classe.
   *
   * @param {string} message
   * @param {number} status
   * @param {string} path
   * @param {string} code
   * @param {string} link
   */
  constructor (message, status, path, code, link) {
    super(message, status, code, link)

    this.path = path
  }

  /**
   * Retorna um array com todas as mensagens de erro dessa exceção.
   *
   * @return {{ [key: string]: string }}
   */
  get messages () {
    return {
      'E_VIOLATED_REQUEST' : 'Requisição violada: um ou mais campos protegidos foram violados.'
    }
  }

  /**
   * Lida com os erros.
   */
  async handle ({ message = null, code }, { response, session }) {
    session.flash({ danger: this.messages[code] || message || this.messages['E_DEFAULT'] })
    await session.commit()
    return response.redirect(this.path || 'back')
  }
}

module.exports = FormErrorException
