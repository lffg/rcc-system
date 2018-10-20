'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions')
const RequestType = use('App/Models/RequestType')

module.exports = validate

/**
 * Valida um payload para requisição, de acordo com a parte informada.
 *
 * @param  {object} payload
 * @param  {1|2|3|'POST'} step
 * @return {Promise<boolean>}
 */
async function validate (payload, step) {
  if (![1, 2, 3, 'POST'].includes(step)) {
    throw new HttpException('Argumento inválido.')
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
