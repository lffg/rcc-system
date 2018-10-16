'use strict'

const ActionsManager = require('./ActionsManager')
const BaseRequest = require('./BaseRequest')

class RequestCreate extends BaseRequest {
  async create () {
    if (!this._data) {
      throw new Error('Você deve passar o objeto de dados para `RequestCreate.create` usando `.data()`.')
    }

    const actions = await this._type.getActions()
    const manager = new ActionsManager(this._data, this._controller, this._type)

    for (const action of actions.map(({ alias }) => alias)) {
      await manager.execute(action)
    }
  }
}

module.exports = RequestCreate
