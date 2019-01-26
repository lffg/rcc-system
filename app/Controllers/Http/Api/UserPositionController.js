'use strict'

const User = use('App/Models/User')

class UserPositionController {
  /**
   * Mostra as posições anterior, seguinte e atual de um determinado
   * usuário.
   *
   * @method GET
   * @api
   */
  async check({ request, response }) {
    const username = request.input('u', '')

    try {
      await User.findByOrFail('username', username)
    } catch (e) {
      return response
        .status(404)
        .json({ status: false, username, error: 'User not found' })
    }

    const {
      position: { id, name, next, prev, equivalence }
    } = (await User.query()
      .select('id', 'username', 'position_id')
      .where({ username })
      .with('position', (builder) => builder.getNear())
      .first()).toJSON()

    return {
      positions: { prev, current: { id, name }, next, equivalence },
      username,
      status: true
    }
  }
}

module.exports = UserPositionController
