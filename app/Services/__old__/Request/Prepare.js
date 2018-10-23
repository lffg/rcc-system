'use strict'

const validatePayload = require('./helpers/validatePayload')
const getInstances = require('./helpers/getInstances')
const validateType = require('./validators/type')

/**
 * Interface para o preparamento e validação de requisições.
 *
 * @param  {object<any>} payload
 * @return {Promise<{ controller: RequestController, type: RequestType }>}
 */
module.exports = async function create (payload = {}) {
  const { controller_id: controllerId, type_id: typeId } = payload

  // Pega as instâncias, verificando se são válidas.
  const { controller, type } = await getInstances(controllerId, typeId)

  // Valida o tipo (se o tipo pertence ao controller):
  await validateType(controller, type)
  await validatePayload(payload)

  return { controller, type }
}
