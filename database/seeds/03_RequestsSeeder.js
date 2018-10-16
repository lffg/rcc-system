'use strict'

const { controllers, actions, types } = require('../seeds-data/requests')
const requests = require('../seeds-data/requests-entries')

const CreateRequest = use('App/Services/Request/CreateRequest')
const RequestController = use('App/Models/RequestController')
const RequestAction = use('App/Models/RequestAction')
const RequestType = use('App/Models/RequestType')
const Position = use('App/Models/Position')
const Request = use('App/Models/Request')
const Database = use('Database')

class RequestsSeeder {
  async run () {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0')
    await RequestController.truncate()
    await RequestAction.truncate()
    await RequestType.truncate()
    await Request.truncate()
    await Database.raw('TRUNCATE TABLE pivot_request_action_type')
    await Database.raw('TRUNCATE TABLE pivot_request_controller_position')
    await Database.raw('SET FOREIGN_KEY_CHECKS = 1')

    await this.createControllers()
    console.log('Controllers de requisições criados.')

    await this.createActions()
    console.log('Ações estáticas de requisições criadas.')

    await this.createTypes()
    console.log('Tipos de requisições criados.')

    await this.relations()
    console.log('Relações das requisições criadas.')

    await this.createRequests()
    console.log('Requisições criadas.')
    // await this.createReviews()
  }

  async relations () {
    const actions = new Map()

    for (const id of await RequestAction.ids()) {
      const action = await RequestAction.find(id)
      actions.set(action.alias, action)
    }

    for (const id of await RequestType.ids()) {
      const type = await RequestType.find(id)
      await type.actions().attach([actions.get('SAVE_REQUEST').id])
    }
  }

  async createControllers () {
    for (const data of controllers) {
      const positions = data.__positions__ || []
      delete data.__positions__

      const controller = new RequestController()
      controller.merge(data)
      await controller.save()

      console.log('Iniciando relações entre controllers e posições.')
      for (const positionId of positions) {
        const position = await Position.findOrFail(positionId)
        await controller.listPositions().attach([position.id], (row) => (row.order = 1))
      }
    }
  }

  async createActions () {
    for (const data of actions) {
      const action = new RequestAction()
      action.merge(data)
      await action.save()
    }
  }

  async createTypes () {
    for (const data of types) {
      const type = new RequestType()
      type.merge(data)
      await type.save()
    }
  }

  async createRequests () {
    const wait = (t = 0) => new Promise((resolve) => setTimeout(resolve, t))

    for (const data of requests) {
      await wait(1000)
      const controller = await RequestController.find(data.controller_id)
      const type = await RequestType.find(data.type_id)

      const req = new CreateRequest(controller, type)
      req.use(data)
      await req.create()
    }
  }
}

module.exports = RequestsSeeder
