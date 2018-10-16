'use strict'

const shortid = require('shortid')

const User = use('App/Models/User')

class AuthController {
  /**
   * Shows the login page.
   *
   * @param {object} ctx
   */
  login ({ view }) {
    return view.render('pages.session.auth.login')
  }

  /**
   * Logs in the user.
   *
   * @param {object} ctx
   */
  async postLogin ({ request, response, session, auth }) {
    const { username, password, remember } = request.all()

    try {
      await auth
        .remember(remember === 'on')
        .attempt(username, password)
    } catch (e) {
      session.flash({ danger: 'Usuário e/ou senha incorreto(s).' })
      return response.redirect('back')
    }

    const { allowed, disallowReason } = auth.user.toJSON()

    if (!allowed) {
      await auth.logout()
      session.flash({ danger: `Seu login foi negado pelo motivo: ${disallowReason}` })
      return response.redirect('back')
    }

    session.flash({ success: `Seja bem-vindo novamente, ${auth.user.username}.` })
    return response.route('index')
  }

  /**
   * Shows the register page.
   *
   * @param {object} ctx
   */
  register ({ view, session }) {
    const motto = `RCC-${shortid.generate()}`

    session.put('confirm-motto', motto)
    return view.render('pages.session.auth.register', { motto })
  }

  /**
   * Creates an user account.
   *
   * @param {object} ctx
   */
  async postRegister ({ request, response, session }) {
    const data = request.only(['username', 'password', 'email'])

    const user = new User()
    user.merge(data)
    await user.save()

    session.flash({ success: `Usuário ${user.username} criado com sucesso. Solicite a ativação para entrar.` })
    return response.route('login')
  }

  /**
   * Logs out the user.
   *
   * @param {object} ctx
   */
  async logout ({ request, response, view, session, auth }) {
    if (request.input('confirm') !== 'on') {
      return view.render('pages.session.auth.confirm-logout')
    }

    const { username } = auth.user

    await auth.logout()
    session.clear()
    session.flash({ success: `Sessão encerrada com sucesso. Até breve, ${username}!` })
    return response.route('login')
  }
}

module.exports = AuthController
