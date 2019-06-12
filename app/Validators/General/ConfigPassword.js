const Hash = use('Hash');

class Password {
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

    session.flash({
      danger:
        'A senha atual para autorizar o procedimento está incorreta. Tente novamente.'
    });

    return response.redirect('back');
  }

  get rules() {
    return {
      password: 'required|min:3|max:50|same:password_confirm',
      password_confirm: 'required|min:3|max:50|same:password',
      current_password: 'required'
    };
  }

  get messages() {
    return {
      min: 'Você deve usar uma senha de, no mínimo, três caracteres.',
      max: 'A senha pode ter, no máximo, 50 caracteres.',
      required: 'Esse campo é obrigatório.',
      same: 'As senhas não coincidem.'
    };
  }
}

module.exports = Password;
