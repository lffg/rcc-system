'use strict'

const { getPositions } = use('App/Models/Position')
const UserParser = use('App/Services/Parsers/User')
const User = use('App/Models/User')
const Log = use('Log')

class UserController {
  /**
   * Shows all the users.
   *
   * @param {object} ctx
   */
  async index ({ request, view }) {
    const { page = 1, username = null } = request.all()

    const query = User.query()

    if (username) {
      query.where('username', 'like', `%${username}%`)
    }

    const data = await query
      .with('groups', (builder) => builder.select('id', 'name', 'color', 'icon').sortByOrder())
      .with('position', (builder) => builder.select('id', 'name'))
      .paginate((page <= 0 ? 1 : page), 50)
      .then((data) => data.toJSON())

    return view.render('admin.users.index', { data, username })
  }

  /**
   * Shows an user.
   *
   * @param {object} ctx
   */
  async show ({ params: { id }, view }) {
    const user = await User.query()
      .where({ id })
      .with('groups', (builder) => builder.select('id', 'name', 'color', 'icon', 'is_hidden').sortByOrder())
      .with('position', (builder) => builder.select('id', 'name', 'alias'))
      .with('ips', (builder) => {
        builder.select('id', 'user_id', 'ip', 'created_at').orderBy('created_at', 'DESC')
      })
      .with('logs', (builder) => {
        builder.select('id', 'user_id', 'log', 'created_at').limit(15).orderBy('created_at', 'DESC')
      })
      .firstOrFail()

    return view.render('admin.users.show', { user: user.toJSON() })
  }

  /**
   * Show logs.
   */
  async logs ({ params: { id }, view }) {
    const user = await User.query()
      .where({ id })
      .with('logs', (builder) => builder.orderBy('created_at', 'DESC'))
      .firstOrFail()

    return view.render('admin.users.logs', { user: user.toJSON() })
  }

  /**
   * Shows the page for edit an user.
   *
   * @param {object} ctx
   */
  async edit ({ params: { id }, view }) {
    const user = await User.query()
      .where({ id })
      .with('position', (builder) => builder.select('id', 'name', 'alias'))
      .firstOrFail()

    const positions = await getPositions()
    return view.render('admin.users.edit', { user: user.toJSON(), positions })
  }

  /**
   * Updates an user.
   *
   * @param {object} ctx
   */
  async update ({ request, response, params: { id }, session, auth }) {
    const data  = UserParser.parse(request.all())
    const user  = await User.findOrFail(id)

    // Create the logs:
    await Log.log(auth.user.id, request.ip(), {
      message: `Alteração em campos do perfil para o usuário ${data.username || user.username}`
    }, {
      message: `Alteração do nome de usuário. De ${user.username} para ${data.username}`,
      cond: (user.username !== data.username)
    }, {
      message: `Senha alterada para o usuário ${data.username || user.username}`,
      cond: (!!data.password && user.password !== data.password)
    }, {
      message: `Estado de ativação do usuário alterado. De ${user.state} para ${data.state}`,
      cond: (data.state !== user.state)
    })

    user.merge(data)
    await user.save()

    session.flash({ success: 'Usuário atualizado com sucesso!' })
    return response.redirect('back')
  }
}

module.exports = UserController
