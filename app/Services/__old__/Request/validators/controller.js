'use strict'

const RequestController = use('App/Models/RequestController')

module.exports = validateController

/**
 * Valida o controller, verificando se ele existe.
 *
 * @param  {string|number} controllerId
 * @return {Promise<boolean>}
 */
async function validateController (controllerId) {
  try {
    await RequestController.findOrFail(controllerId)
  } catch (e) {
    return false
  }

  return true
}
