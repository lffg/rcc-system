'use strict'

const Position = use('App/Models/Position')
const User = use('App/Models/User')

class PositionController {
  /**
   * Mostra a página-índice para as posições.
   *
   * @method GET
   */
  index ({ view }) {
    return view.render('pages.positions.index')
  }

  /**
   * Mostra a listagem de posiçòes.
   *
   * @method GET
   */
  async list ({ view }) {
    const groups = await Position.getFullPositionsList()
    return view.render('pages.positions.list', { groups })
  }

  /**
   * Mostra a página de usuários por posição.
   *
   * @method GET
   */
  async users ({ view }) {
    const groups = await Position.getFullPositionsList()
    return view.render('pages.positions.users', { groups })
  }

  /**
   * Mostra usuários por posição.
   *
   * @method GET
   */
  async showUsers ({ params: { positionId = null }, view }) {
    const users = await User.query()
      .select('id', 'username')
      .where({ position_id: positionId })
      .limit(150)
      .fetch()
      .then((users) => users.toJSON())

    return view.render('pages.positions.show-users', { users })
  }

  /**
   * Mostra todos os usuários por posição.
   *
   * @method GET
   */
  async showAllUsers ({ request, params: { positionId = null }, view }) {
    if (request.ajax() || request.input('data', null)) {
      const users = await User.query()
        .select('username', 'tag')
        .where({ position_id: positionId })
        .fetch()
        .then((users) => users.toJSON())

      if (!users.length) return ''
      return `<ul>${users.map(({ username, tag }) => `<li>[${tag}] ${username}</li>`).join('')}</ul>`
    }

    const position = await Position.findOrFail(positionId)
    return view.render('pages.positions.show-all-users', { position: position.toJSON() })
  }
}

module.exports = PositionController
