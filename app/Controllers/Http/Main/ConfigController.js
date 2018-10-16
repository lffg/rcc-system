'use strict'

class ConfigController {
  /**
   * Shows the main configuration page.
   *
   * @param {object} ctx
   */
  main ({ view, auth: { user } }) {
    return view.render('pages.session.config.index', {
      user: user.toJSON(),
      mode: 'main'
    })
  }

  /**
   * Shows the e-mail configuration page.
   *
   * @param {object} ctx
   */
  email ({ view, auth: { user } }) {
    return view.render('pages.session.config.index', {
      user: user.toJSON(),
      mode: 'email'
    })
  }

  /**
   * Stores the e-mail configuration.
   *
   * @param {object} ctx
   */
  async saveEmail ({ request, response, session, auth: { user } }) {
    const data = request.only(['email'])

    user.is_verified_email = false
    user.merge(data)
    await user.save()

    session.flash({ success: 'Seu e-mail foi atualizado com sucesso!' })
    return response.redirect('back')
  }

  /**
   * Stores the main configuration data.
   *
   * @param {object} ctx
   */
  async saveMain ({ request, response, session, auth: { user } }) {
    const data = request.only(['location', 'gender', 'bio'])

    user.merge(data)
    await user.save()

    session.flash({ success: 'Seu perfil foi atualizado com sucesso!' })
    return response.redirect('back')
  }

  /**
   * Shows the password configuration page.
   *
   * @param {object} ctx
   */
  password ({ view, auth: { user } }) {
    return view.render('pages.session.config.index', {
      user: user.toJSON(),
      mode: 'password'
    })
  }

  /**
   * Stores the password configuration.
   *
   * @param {object} ctx
   */
  async savePassword ({ request, response, session, auth }) {
    const data = request.only(['password'])

    auth.user.merge(data)
    await auth.user.save()

    // Logout:
    await auth.logout()
    session.clear()

    session.flash({ success: 'Sua senha foi atualizada com sucesso!' })
    return response.route('login')
  }
}

module.exports = ConfigController
