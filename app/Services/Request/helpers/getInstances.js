'use strict'

const RequestController = use('App/Models/RequestController')
const RequestType = use('App/Models/RequestType')

module.exports = getInstances

/**
 * Retorna as instâncias de controller e type.
 *
 * @param  {number} controllerId
 * @param  {number} typeId
 * @return {Promise<{ controller: RequestController, type: RequestType }>}
 * @throws {Error} Se o controller ou tipo não forem encontrados.
 */
async function getInstances (controllerId, typeId) {
  return {
    controller: await RequestController.findOrFail(controllerId),
    type: await RequestType.findOrFail(typeId)
  }
}
