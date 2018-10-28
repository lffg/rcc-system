'use strict'

const { controllers, actions, types } = require('../seeds-data/requests')
const requests = require('../seeds-data/requests-entries')

const RequestController = use('App/Models/RequestController')
const { RequestInterface } = use('App/Services/Request')
const RequestAction = use('App/Models/RequestAction')
const RequestType = use('App/Models/RequestType')

class RequestsSeeder {
  async run () {
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
      delete data.__positions__

      const controller = new RequestController()
      controller.merge(data)
      await controller.save()
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
    for (const data of requests) {
      await RequestInterface.create(data)
    }
  }
}

module.exports = RequestsSeeder
