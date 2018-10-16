'use strict'

class RequestController {
  register (Model) {
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

    Model.getControllers = async (getTypes = false) => {
      const query = Model.query()
        .select('id', 'name')

      if (getTypes) {
        query.with('types', (builder) => builder.select('id', 'controller_id', 'name'))
      }

      return query.fetch().then((query) => query.toJSON())
    }
  }
}

module.exports = RequestController
