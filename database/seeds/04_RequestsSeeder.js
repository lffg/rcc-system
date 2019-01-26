'use strict'

const { controllers, actions, types } = require('../seeds-data/requests')

const RequestController = use('App/Models/RequestController')
const RequestAction = use('App/Models/RequestAction')
const RequestType = use('App/Models/RequestType')

async function getActionsMap() {
  const actions = new Map()

  for (const id of await RequestAction.ids()) {
    const action = await RequestAction.find(id)
    actions.set(action.alias, action)
  }

  return actions
}

class RequestsSeeder {
  async run() {
    await this.createControllers()
    console.log('Controllers de requisições criados.')

    await this.createActions()
    console.log('Ações estáticas de requisições criadas.')

    await this.createTypes()
    console.log('Tipos de requisições criados.')

    await this.relations()
    console.log('Relações das requisições criadas.')
  }

  async relations() {
    const actions = await getActionsMap()

    for (const id of await RequestType.ids()) {
      const type = await RequestType.find(id)
      await type
        .actions()
        .attach([
          actions.get('CREATE_REQUEST').id,
          actions.get('UPDATE_REQUEST').id,
          actions.get('CREATE_UPDATE_LOG').id,
          actions.get('REJECT_GENERAL_OPS').id,
          actions.get('APPROVE_GENERAL_OPS').id
        ])
    }
  }

  async createControllers() {
    for (const data of controllers) {
      delete data.__positions__

      const controller = new RequestController()
      controller.merge(data)
      await controller.save()
    }
  }

  async createActions() {
    for (const data of actions) {
      const action = new RequestAction()
      action.merge(data)
      await action.save()
    }
  }

  async createTypes() {
    const actionsMap = await getActionsMap()

    for (const data of types) {
      const actions = data.__actions__
      delete data.__actions__

      const type = new RequestType()
      type.merge(data)
      await type.save()

      if (actions) {
        await type
          .actions()
          .attach(actions.map((action) => actionsMap.get(action).id))
      }
    }
  }
}

module.exports = RequestsSeeder
