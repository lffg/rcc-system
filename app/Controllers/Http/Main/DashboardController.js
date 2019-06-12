const User = use('App/Models/User');

class DashboardController {
  /**
   * Mostra a página principal do System.
   *
   * @method GET
   */
  async index({ response, view, session, auth }) {
    try {
      await auth.check();
    } catch (e) {
      session.flash({ danger: 'Faça o login para acessar o System.' });
      return response.route('login');
    }

    return view.render('pages.dashboard.index', {
      online_users: await this._getOnlineUsers()
    });
  }

  /**
   * Retorna os usuários on-line no System.
   *
   * @internal
   * @return {Promise<object[]>}
   */
  async _getOnlineUsers() {
    const users = await User.query()
      .select('id', 'username', 'last_visit')
      .with('groups', (builder) =>
        builder
          .select('id', 'icon', 'color')
          .whereNot('is_hidden', true)
          .sortByOrder()
      )
      .havingBetween('last_visit', [Date.now() - 1000 * 60 * 60, Date.now()])
      .fetch();

    return users.toJSON();
  }
}

module.exports = DashboardController;
