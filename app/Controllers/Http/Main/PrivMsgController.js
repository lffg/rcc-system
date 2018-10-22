'use strict'

class PrivMsgController {
  index ({ response, session }) {
    session.flash({ warning: 'Este recurso estará disponível em breve.' })
    return response.route('index')
  }
}

module.exports = PrivMsgController
