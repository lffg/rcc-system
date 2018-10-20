'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions')
const RequestType = use('App/Models/RequestType')

module.exports = validateType

/**
 * Valida o tipo para o determinado controller.
 *
 * @param  {object<RequestController>} controller
 * @param  {object<RequestType>} type
 * @return {Promise<boolean>}
 * @throws {HttpException} Se o tipo for inválido.
 */
async function validateType (controller, type) {
  const types = await RequestType.findTypesFor(controller.id)

  if (!types.map(({ id }) => id).includes(parseInt(type.id))) {
    throw new HttpException('Tipo inválido para controller.', 400)
  }

  return true
}
