'use strict'

class RequestController {
  register (Model) {
    /**
     * ---------------------------------------------------------------------
     * Métodos estáticos:
     * ---------------------------------------------------------------------
     */

    /**
     * Retorna informações de um determinado controller.
     *
     * @param  {number} id
     * @return {Promise<object>}
     */
    Model.getInfoFor = async (id = null) => {
      const controller = await Model.query()
        .select('id', 'name', 'description')
        .where({ id })
        .first()

      if (!controller) {
        throw new Error(`RequestController inexistente para ID ${id}.`)
      }

      return controller.toJSON()
    }

    /**
     * Seleciona todos os controllers, retornando também, os seus tipos,
     * caso seja solicitado.
     *
     * @param  {boolean} getTypes
     * @return {Promise<object>}
     */
    Model.getControllers = async (onlyForCrh = true, getTypes = false) => {
      const query = Model.query()
        .select('id', 'name')

      if (onlyForCrh) {
        query.whereNot('is_crh', false)
      }

      if (getTypes) {
        query.with('types', (builder) => builder.select('id', 'controller_id', 'name'))
      }

      return query.fetch().then((query) => query.toJSON())
    }
  }
}

module.exports = RequestController
