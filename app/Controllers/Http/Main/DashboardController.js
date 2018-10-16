'use strict'

const User = use('App/Models/User')

class DashboardController {
  /**
   * Shows the main system dashboard.
   *
   * @param {object} ctx
   */
  async index ({ view }) {
    await this._ensureAuth(...arguments)

    return view.render('pages.dashboard.index', {
      online_users: await this._getOnlineUsers()
    })
  }

  /**
   * Ensure auth.
   *
   * @private
   * @param {object} ctx
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
   * Gets the online users.
   *
   * @async
   * @private
   * @return {object}
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
