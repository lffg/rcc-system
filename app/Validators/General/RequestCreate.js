'use strict'

const { sprintf } = require('sprintf-js')

const { HttpException } = use('@adonisjs/generic-exceptions')
const { RequestInterface } = use('App/Services/Request')
const { splitNicks } = use('App/Helpers/split-nicks')
const FormError = use('App/Exceptions/FormError')
const Route = use('Route')

class RequestCreate {
  /**
   * Retorna as mensagens de erro.
   *
   * @return {object}
   */
  get messages () {
    const { request } = this.ctx
    const affecteds = splitNicks(request.input('receivers', ''), true)

    return {
      'INVALID_AUTHOR'     : 'O campo "requerente" está inválido. Atualize a página e tente novamente.',
      'INVALID_CONTROLLER' : 'O requerimento selecionado não existe ou é inválido para este contexto.',
      'NO_USERS'           : 'Você deve fornecer usuários que serão afetados pelo requerimento.',
      'INVALID_TYPE'       : 'O tipo para o requerimento escolhido não existe ou está inválido.',
      'MORE_THAN_ONE_USER' : 'Este requerimento só aceita um usuário afetado por vez.',
      'NO_USER'            : 'O usuário "%s" não existe.',
      'INVALID_POSITION'   : 'A posição "%s" do usuário %s não é válida para este requerimento.',
      'DIF_POSITIONS'      : `Os usuários afetados (${affecteds.join(', ')}) devem ser da mesma patente/cargo.`,
      'MISSING_VALUES'     : 'Você deve completar todos os campos obrigatórios. [%s]',
      'FORBIDDEN_FIELDS'   : 'Você forneceu dados adicionais proibidos para este tipo de requerimento. [%s]',
      '$default'           : 'Houve um erro desconhecido ao tentar criar o requerimento.'
    }
  }

  /**
   * Retorna um erro ao cliente.
   *
   * @param  {string} error
   * @param  {string[]} params
   * @param  {number} status
   * @return {any}
   */
  error (error, params = [], status = 400) {
    const uri = Route.url('requests.create')
    const { request, response } = this.ctx
    error = sprintf(error || this.messages['$default'], ...params)

    if (/\/save$/i.test(request.url())) {
      throw new FormError(`Erro ao tentar criar a requisição: ${error}`, 400, uri)
    }

    response.status(status).json({ error })
    return false
  }

  async authorize () {
    const { request, params: requestParams } = this.ctx
    let step

    if (!requestParams.step && [1]) {
      step = 3
    } else {
      switch (parseInt(requestParams.step)) {
        case 1:
          return true
        case 2:
          step = 1
          break
        case 3:
          step = 2
          break
        default:
          throw new HttpException('Requisição inválida.', 400)
      }
    }

    const {
      status, code, params = []
    } = await RequestInterface.validate(step, request.all())

    if (!status) {
      return this.error(this.messages[code], params)
    }

    return true
  }
}

module.exports = RequestCreate
