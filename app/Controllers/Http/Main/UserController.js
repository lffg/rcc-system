'use strict'

const { merge } = require('lodash')

const UserParser = use('App/Services/Parsers/User')
const User = use('App/Models/User')
const Log = use('Log')

class UserController {
  /**
   * Shows all the users.
   *
   * @method  GET
   * @param  {object} ctx
   */
  async index ({ request, view }) {
    let { page = 1, u = '', order, order_by: orderBy } = request.all() // , inactive

    const query = User.query()

    if (page <= 0) page = 1
    if (u.length > 0) query.where('username', 'like', `%${u}%`)
    if (order === 'last_visit' || order === 'username' || order === 'id') {
      query.orderBy(order, orderBy === 'asc' ? 'asc' : 'desc')
    }

    const data = await query
      .with('groups', (builder) => builder.select('id', 'name').whereNot('is_hidden', true).sortByOrder())
      .with('position', (builder) => builder.select('id', 'name', 'alias'))
      .paginate(page, 36)
      .then((data) => data.toJSON())

    return view.render('pages.users.index', {
      data,
      fields: { u, order, order_by: orderBy }, // , inactive
      pagination: [
        '?paginate=true',
        u ? `u=${u}` : '',
        order ? `order=${order}` : '',
        orderBy ? `order_by=${orderBy}` : '' // ,
        // inactive ? `inactive=${inactive}` : ''
      ].filter((param) => param !== '').join('&')
    })
  }

  /**
   * Shows an user.
   *
   * @method GET
   * @param  {object} ctx
   */
  async show ({ request, view }) {
    const username = request.input('u', null)

    const userData = await User.query()
      .where({ username })
      .with('promoter', (builder) => builder.select('id', 'username', 'tag'))
      .with('groups', (builder) => builder.select('id', 'name', 'color', 'icon', 'is_hidden').sortByOrder())
      .with('position', (builder) => builder.select('id', 'name', 'alias'))
      .firstOrFail()

    const userSalary = await User.findBy('username', username)
      .then((user) => user.getSalary())

    const user = merge(userData.toJSON(), userSalary)
    return view.render('pages.users.show', { user })
  }

  /**
   * Shows the page for edit an user.
   *
   * @method  GET
   * @param  {object} ctx
   */
  async edit ({ params: { id }, view }) {
    const user = await User.query()
      .where({ id })
      .with('groups', (builder) => builder.select('id', 'name', 'color', 'icon'))
      .with('position', (builder) => builder.select('id', 'name', 'alias'))
      .firstOrFail()

    return view.render('pages.users.edit', { user: user.toJSON() })
  }

  /**
   * Updates an user.
   *
   * @method POST
   * @param  {object} ctx
   */
  async update ({ request, response, params: { id }, session, auth }) {
    const data  = UserParser.parse(request.all())
    const user  = await User.findOrFail(id)

    if (data.password === '') delete data.password

    // Create the logs:
    await Log.log(auth.user.id, request.ip(), {
      message: `Alteração em campos do perfil para o usuário ${data.username || user.username}`
    }, {
      message: `Alteração do nome de usuário. De ${user.username} para ${data.username}`,
      cond: (user.username !== data.username)
    }, {
      message: `Senha alterada para o usuário ${data.username || user.username}`,
      cond: (!!data.password && user.password !== data.password)
    })

    user.merge(data)
    await user.save()

    session.flash({ success: 'Usuário atualizado com sucesso!' })
    return response.redirect('back')
  }

  /**
   * Shows the page to find an user.
   *
   * @method GET
   * @param  {object} ctx
   */
  async find ({ view, auth: { user: { id } } }) {
    const lastSearches = await User.query()
      .where({ id })
      .select('id')
      .with('userSearches', (builder) => builder.groupBy('username').orderBy('created_at', 'desc'))
      .limit(10)
      .first()

    return view.render('pages.users.find', {
      lastSearches: lastSearches.toJSON().userSearches,
      usernames: await this.autocomplete(...arguments)
    })
  }

  /**
   * Shows all the users that match to the query.
   *
   * @method GET
   * @param {object} ctx
   */
  async autocomplete ({ request }) {
    const query = request.input('query', '')

    const usernames = await User.query()
      .select('username')
      .where('username', 'like', `%${query}%`)
      .orderByRaw('last_visit DESC, username')
      .limit(5)
      .fetch()
      .then((usernames) => usernames.toJSON().map(({ username }) => username))

    return usernames
  }

  /**
   * Redirect to the user page if exists.
   *
   * @method POST
   * @param  {object} ctx
   */
  async findAction ({ request, response, session, auth }) {
    const username = request.input('username', '')

    try {
      await User.findByOrFail('username', username)
    } catch (e) {
      session.flash({ danger: `O usuário "${username}" não existe.` })
      return response.redirect('back')
    }

    await auth.user.userSearches().create({ username })

    session.flash({ info: 'Redirecionado da página de busca.' })
    return response.redirect(`/users/see?u=${username}`)
  }
}

module.exports = UserController
