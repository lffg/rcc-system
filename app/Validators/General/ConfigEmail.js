const Hash = use('Hash');

class Email {
  get validateAll() {
    return true;
  }

  async authorize() {
    const { request, response, session, auth } = this.ctx;

    if (
      await Hash.verify(request.input('current_password'), auth.user.password)
    ) {
      return true;
    }

    session.flash({ danger: 'A senha de confirmação está incorreta.' });
    return response.redirect('back');
  }

  get rules() {
    return {
      email: 'required|email|max:175|unique:users,email',
      current_password: 'required'
    };
  }

  get messages() {
    return {
      required: 'Este campo é obrigatório.',
      email: 'Este e-mail não é válido.',
      unique: 'Este e-mail já está em uso.',
      max: 'O e-mail deve ter, no máximo, 175 caracteres.'
    };
  }

  async fails(errorMessages) {
    const { response, session } = this.ctx;

    session
      .flash({
        danger: 'Whoops! Parece que houveram alguns erros! Veja abaixo.'
      })
      .withErrors(errorMessages)
      .flashExcept(['current_password']);

    response.redirect('back');
  }
}

module.exports = Email;
