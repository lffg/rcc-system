'use strict'

class Login {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      'username': 'required',
      'password': 'required'
    }
  }

  get messages () {
    return {
      'required': 'Este campo é obrigatório.'
    }
  }

  async fails (errorMessages) {
    const { response, session } = this.ctx

    session.withErrors(errorMessages).flashAll()
    return response.redirect('back')
  }
}

module.exports = Login
