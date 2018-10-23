'use strict'

const validateController = require('./validators/controller')

const { HttpException } = use('@adonisjs/generic-exceptions')
const RequestType = use('App/Models/RequestType')

module.exports = validate

/**
 * Retorna um objeto sinalizando um erro de validação.
 *
 * @param  {string} code
 * @param  {string[]} params
 * @return {{ status: false, code: string, params: string[] }}
 */
function error (code, params = []) {
  return {
    status: false,
    code,
    params
  }
}

/**
 * Valida um payload para requisição, de acordo com a parte informada.
 *
 * @param  {object} payload
 * @param  {1|2|3|'POST'} step
 * @return {Promise<{ status: boolean, code? string, params?: string[] }>}
 */
async function validate (payload, step) {
  if (![1, 2, 3].includes(step)) {
    return error('INVALID_STEP')
  }

  if (!(await validateController(payload.controller_id))) {
    return error('INVALID_CONTROLLER')
  }

  if (step === 1) {
    return { status: true }
  }

  // Parte 01 -> 02.
  const validController = await this.checkController()
  if (step === 1 || !(validController)) return (validAuthor && validController)

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
