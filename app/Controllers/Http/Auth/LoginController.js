class LoginController {
  /**
   * Mostra a página com o formulário de login.
   *
   * @method GET
   */
  login({ view }) {
    return view.render('pages.session.auth.login')
  }

  /**
   * Loga um usuário, criando a sua sessão.
   *
   * @method POST
   */
  async postLogin({ request, response, session, auth }) {
    const { username, password, remember } = request.all()

    try {
      await auth.remember(remember === 'on').attempt(username, password)
    } catch (e) {
      session.flash({ danger: 'Usuário e/ou senha incorreto(s).' })
      return response.redirect('back')
    }

    const { allowed, disallowReason } = auth.user.toJSON()

    if (!allowed) {
      await auth.logout()
      session.flash({
        danger: `Seu login foi negado pelo motivo: ${disallowReason}`
      })
      return response.redirect('back')
    }

    session.flash({
      success: `Seja bem-vindo novamente, ${auth.user.username}.`
    })
    return response.route('index')
  }

  /**
   * Remove a sessão de um usuário, deslogando-o do System.
   *
   * @method GET
   */
  async logout({ request, response, view, session, auth }) {
    if (request.input('confirm') !== 'on') {
      return view.render('pages.session.auth.confirm-logout')
    }

    const { username } = auth.user

    await auth.logout()
    session.clear()
    session.flash({
      success: `Sessão encerrada com sucesso. Até breve, ${username}!`
    })
    return response.route('login')
  }
}

module.exports = LoginController
