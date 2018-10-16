'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions')

class FormError extends HttpException {
  constructor (message, path, status, code, link) {
    super(message, status, code, link)

    this.path = path
  }

  /**
   * Retorna um array com todas as mensagens de erro dessa exceção.
   *
   * @return {object}
   */
  get messages () {
    return {
      'E_VIOLATED_REQUEST': 'Requisição violada: um ou mais campos protegidos foram violados.',
      'E_BLANK_PASSWORD'  : 'Senha inválida: a senha não pode ser vazia.',
      'E_DEFAULT'         : 'Houve um erro de formulário desconhecido. Atualize a página e tente novamente.'
    }
  }

  /**
   * Lida com os erros.
   *
   * @param  {object} error
   * @param  {object} ctx
   * @return {Promise<any>}
   */
  async handle ({ code = 'E_DEFAULT' }, { response, session }) {
    session.flash({ danger: this.messages[code] || this.messages['E_DEFAULT'] })
    await session.commit()
    return response.redirect(this.path || 'back')
  }
}

module.exports = FormError
