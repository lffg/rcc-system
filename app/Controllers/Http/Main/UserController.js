'use strict'

const { merge } = require('lodash')

const User = use('App/Models/User')
const Database = use('Database')
const Route = use('Route')

class UserController {
  /**
   * Mostra a página com todos os usuários.
   *
   * @method  GET
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
   * Mostra os detalhes de um usuário.
   *
   * @method GET
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
   * Mostra a timeline de um determinado usuário.
   *
   * @method GET
   */
  async timeline ({ params: { id }, view }) {
    const events = await Database
      .select([
        'req.*',
        'T.timeline_title as type_title',
        'T.color as type_color',
        'T.icon as type_icon',
        'R.username as receiver',
        'A.username as author'
      ])
      .from('requests as req')
      .innerJoin('request_controllers as C', 'C.id', '=', 'req.controller_id')
      .innerJoin('request_types as T', 'T.id', '=', 'req.type_id')
      .innerJoin('users as R', 'R.id', '=', 'req.receiver_id')
      .innerJoin('users as A', 'A.id', '=', 'req.author_id')
      .where('R.id', id)
      .orderByRaw('req.created_at DESC, req.id DESC')

    return view.render('pages.users.timeline-items', { events })
  }

  /**
   * Mostra a página para procurar um usuário.
   *
   * @method GET
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
   * Mostra todos os usuários que correspondem à query.
   *
   * @method GET
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
   * Redireciona para o perfil de um usuário, se existir.
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
    return response.redirect(`${Route.url('users.show')}?u=${username}`)
  }
}

module.exports = UserController
