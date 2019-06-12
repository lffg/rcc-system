class ConfigController {
  /**
   * Mostra a página-índice para as configurações do usuário.
   *
   * @method GET
   */
  main({ view, auth: { user } }) {
    return view.render('pages.session.config.index', {
      user: user.toJSON(),
      mode: 'main'
    });
  }

  /**
   * Salva as configurações gerais.
   *
   * @method POST
   */
  async saveMain({ request, response, session, auth: { user } }) {
    const data = request.only(['location', 'gender', 'bio']);

    user.merge(data);
    await user.save();

    session.flash({ success: 'Seu perfil foi atualizado com sucesso!' });
    return response.redirect('back');
  }

  /**
   * Mostra a página para configurar o e-mail.
   *
   * @method GET
   */
  email({ view, auth: { user } }) {
    return view.render('pages.session.config.index', {
      user: user.toJSON(),
      mode: 'email'
    });
  }

  /**
   * Salva as configurações do e-mail.
   *
   * @method POST
   */
  async saveEmail({ request, response, session, auth: { user } }) {
    const data = request.only(['email']);

    user.is_verified_email = false;
    user.merge(data);
    await user.save();

    session.flash({ success: 'Seu e-mail foi atualizado com sucesso!' });
    return response.redirect('back');
  }

  /**
   * Mostra a página para alterar a senha.
   *
   * @method GET
   */
  password({ view, auth: { user } }) {
    return view.render('pages.session.config.index', {
      user: user.toJSON(),
      mode: 'password'
    });
  }

  /**
   * Salva a configuração de senha.
   *
   * @param {object} ctx
   */
  async savePassword({ request, response, session, auth }) {
    const data = request.only(['password']);

    auth.user.merge(data);
    await auth.user.save();

    // Desloga o usuário:
    await auth.logout();
    session.clear();

    session.flash({ success: 'Sua senha foi atualizada com sucesso!' });
    return response.route('login');
  }
}

module.exports = ConfigController;
