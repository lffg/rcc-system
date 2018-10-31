'use strict'

const Request = use('App/Models/Request')

class RequestEntityController {
  async show ({ params: { id } }) {
    return (await Request.find(id)).toJSON()
  }
}

module.exports = RequestEntityController
