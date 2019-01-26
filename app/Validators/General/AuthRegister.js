'use strict'

const { validate } = use('App/Services/General/ValidateUser')

class Register {
  get validateAll () {
    return true
  }

  async authorize () {
    const { request, response, session } = this.ctx
    const { username } = request.only('username')
    const { status, error, refresh } = await validate(username, session.get('confirm-motto'))

    if (!status) {
      session.flash({ danger: error })
      if (!refresh) session.flashExcept('password')
      return response.redirect('back')
    }

    return true
  }

  get rules () {
    return {
      'username': 'required|unique:users,username',
      'email'   : 'required|email|max:175|unique:users,email',
      'password': 'required|min:3|max:50'
    }
  }

  get messages () {
    return {
      'required'       : 'Esse campo é obrigatório.',
      'min'            : 'Você deve usar uma senha de, no mínimo, três caracteres.',
      'username.unique': 'Este nome de usuário já está em uso.',
      'email.email'    : 'Este e-mail é inválido.',
      'email.max'      : 'Este e-mail vai além do limite de 175 caracteres.',
      'email.unique'   : 'Este e-mail já está em uso.',
      'password.max'   : 'A senha pode ter, no máximo, 50 caracteres.'
    }
  }

  async fails (errorMessages) {
    const { response, session } = this.ctx

    session.withErrors(errorMessages).flashAll()
    return response.redirect('back')
  }
}

module.exports = Register
