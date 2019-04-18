const Hash = use('Hash')

class ConfirmEmail {
  get validateAll() {
    return true
  }

  async authorize() {
    const { request, response, session, auth } = this.ctx

    if (await Hash.verify(request.input('password'), auth.user.password)) {
      return true
    }

    session.flash({ danger: 'A senha de confirmação está incorreta.' })
    return response.redirect('back')
  }

  get rules() {
    const { id } = this.ctx.auth.user

    return {
      email: `required|email|max:175|unique:users,email,id,${id}`,
      password: 'required'
    }
  }

  get messages() {
    return {
      'password.required': 'Este campo é obrigatório.',
      'email.required': 'O e-mail é obrigatório.',
      'email.unique': 'O e-mail fornecido já está em uso.',
      'email.email': 'O e-mail fornecido não é válido.',
      'email.max': 'O e-mail deve ter, no máximo, 175 caracteres.'
    }
  }

  async fails(errorMessages) {
    const { response, session } = this.ctx

    session.withErrors(errorMessages)
    response.redirect('back')
  }
}

module.exports = ConfirmEmail
