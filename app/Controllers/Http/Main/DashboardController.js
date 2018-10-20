'use strict'

const User = use('App/Models/User')

class DashboardController {
  /**
   * Mostra a página principal do System.
   *
   * @method GET
   */
  async index ({ view }) {
    await this._ensureAuth(...arguments)

    return view.render('pages.dashboard.index', {
      online_users: await this._getOnlineUsers()
    })
  }

  /**
   * Certifica-se de que o usuário está autenticado.
   *
   * @internal
   * @param  {object} context
   * @return {any}
   */
  async _ensureAuth ({ response, session, auth }) {
    try {
      await auth.check()
    } catch (e) {
      session.flash({ danger: 'Você precisa estar autenticado para acessar a página principal.' })
      return response.route('login')
    }
  }

  /**
   * Retorna os usuários on-line no System.
   *
   * @internal
   * @return {Promise<object[]>}
   */
  async _getOnlineUsers () {
    const users = await User.query()
      .select('id', 'username', 'last_visit')
      .with('groups', (builder) => builder.select('id', 'icon', 'color').whereNot('is_hidden', true).sortByOrder())
      .havingBetween('last_visit', [Date.now() - 1000 * 60 * 60, Date.now()])
      .fetch()

    return users.toJSON()
  }
}

module.exports = DashboardController
