'use strict'

const { sprintf } = require('sprintf-js')

const { HttpException } = use('@adonisjs/generic-exceptions')
const RequestController = use('App/Models/RequestController')
const RequestException = use('App/Exceptions/Request')
const RequestType = use('App/Models/RequestType')
const Route = use('Route')

/**
 * Divide uma string de nomes de usuários pela barra.
 *
 * @param  {string} nicks
 * @return {string}
 */
function splitNicks (nicks = '') {
  return [...new Set(nicks.split(/\\|\//).map((s) => s.trim()).filter((s) => /\S/.test(s)))]
}

class RequestCreate {
  /**
   * Retorna as mensagens de erro.
   *
   * @return {object}
   */
  get messages () {
    return {
      'INVALID_AUTHOR'     : 'O campo "requerente" está inválido. Atualize a página e tente novamente.',
      'INVALID_CONTROLLER' : 'O requerimento selecionado não existe.',
      'NO_USERS'           : 'Você deve fornecer usuários que serão afetados pelo requerimento.',
      'INVALID_TYPE'       : 'O tipo para o requerimento escolhido não existe ou está inválido.',
      'MORE_THAN_ONE_USER' : 'Este requerimento só aceita um usuário afetado por vez.',
      'NO_USER'            : 'O usuário "%s" não existe.',
      'INVALID_POSITION'   : 'O usuário "%s" não tem uma patente/cargo válida para este requerimento.',
      'MISSING_VALUES'     : 'Você deve completar todos os campos obrigatórios. [%s]',
      'FORBIDDEN_FIELDS'   : 'Você forneceu dados adicionais proibidos. [%s]'
    }
  }

  /**
   * Retorna um erro ao cliente.
   *
   * @param  {string} error
   * @param  {number} status
   * @return {any}
   */
  error (error, status = 400, params = []) {
    const uri = Route.url('requests.create')
    const { request, response } = this.ctx
    error = sprintf(error, params)

    if (/\/save$/i.test(request.url())) {
      throw new RequestException(`Erro ao tentar criar a requisição: ${error}`, 400, uri)
    }

    response.status(status).json({ error })
    return false
  }

  /**
   * Verifica se o autor do requerimento é a pessoa que está logada
   * no momento da requisição.
   *
   * @return {boolean}
   */
  checkAuthor () {
    const { request, auth } = this.ctx
    const authorId = request.input('author_id')

    if (parseInt(authorId) !== auth.user.id) {
      return this.error(this.messages['INVALID_AUTHOR'])
    }

    return true
  }

  /**
   * Verifica se o controller é válido.
   *
   * @return {boolean}
   */
  async checkController () {
    const { request } = this.ctx
    const cId = request.input('controller_id')

    try {
      await RequestController.findOrFail(cId)
    } catch (e) {
      return this.error(this.messages['INVALID_CONTROLLER'])
    }

    return true
  }

  /**
   * Verifica se o tipo é válido, verificando também o controller,
   * através do método `findTypesFor`.
   *
   * @return {boolean}
   */
  async checkType () {
    const { request } = this.ctx
    const { controller_id: cId = null, type_id: tId = null } = request.only(['controller_id', 'type_id'])

    try {
      const types = await RequestType.findTypesFor(cId)

      if (!types.map(({ id }) => id).includes(parseInt(tId))) {
        return this.error(this.messages['INVALID_TYPE'])
      }
    } catch (e) {
      return this.error(this.messages['INVALID_CONTROLLER'])
    }

    return true
  }

  /**
   * Usa a interface fornecida pela instância do `RequestType` para
   * validar os usuários que sofrerão com o requerimento.
   *
   * @param  {object<RequestType>} type
   * @return {boolean}
   */
  async checkUsers (type) {
    const { request } = this.ctx
    const receivers = request.input('receivers')
    const users = splitNicks(receivers)

    const { status, code, params = [] } = await type.validateUsers(users)

    if (!status) {
      return this.error(this.messages[code], 400, params)
    }

    return true
  }

  /**
   * Usa a interface fornecida pela instância do `RequestType` para
   * validar os campos requeridos pelo tipo.
   *
   * @param  {object<RequestType>} type
   * @return {boolean}
   */
  async checkFields (type) {
    const { request } = this.ctx
    const data = request.all()

    const { status, code, params = [] } = await type.validateFields(data)

    if (!status) {
      return this.error(this.messages[code], 400, params)
    }

    return true
  }

  /**
   * Valida todas as informações, de acordo com a parte especificada
   * no parâmetro "step".
   *
   * 1 -> Indo da parte 01 para parte 02
   * 2 -> Indo da parte 02 para parte 03
   * 3 -> Postando o formulário (salvando)
   *
   * @param  {number} step
   * @return {any}
   */
  async check (step) {
    const { request } = this.ctx
    const tId = request.input('type_id', null)

    if (typeof step !== 'number' || ![1, 2, 3].includes(step)) {
      throw new TypeError('Tipo inválido para check.')
    }

    // Parte 01 -> 02.
    const validAuthor = this.checkAuthor()
    const validController = await this.checkController()
    if (step === 1 || !(validAuthor && validController)) return (validAuthor && validController)

    // Parte 02 -> 03.
    const type = await RequestType.find(tId)
    if (!type) return this.error(this.messages['INVALID_TYPE'])
    const validType = await this.checkType()
    const validUser = await this.checkUsers(type)
    if (step === 2 || !(validType && validUser)) return (validType && validUser)

    // Parte 03 -> Postagem.
    const validFields = await this.checkFields(type)
    if (step === 3 || !(validFields)) return !!validFields

    return false
  }

  /**
   * Autoriza a requisição.
   *
   * @return {any}
   */
  async authorize () {
    const { request } = this.ctx
    const toPart = parseInt(request.url().replace(/.+?-(\d+)$/, '$1'))

    if (/\/save$/i.test(request.url())) {
      return this.check(3)
    }

    switch (toPart) {
      case 1:
        return true
      case 2:
        return this.check(1)
      case 3:
        return this.check(2)
      default:
        throw new HttpException('Requisição inválida.', 400)
    }
  }
}

module.exports = RequestCreate
