'use strict'

const User = use('App/Models/User')
const Database = use('Database')

class UserController {
  /**
   * Verifica a existência de um usuário no System.
   *
   * @method GET
   * @api
   */
  async check ({ request, response }) {
    const username = request.input('u', '')

    try {
      await User.findByOrFail('username', username)
    } catch (e) {
      return response.status(404).json({ status: false, username, error: 'User not found' })
    }

    return { status: true, username }
  }

  /**
   * Verifica se a TAG existe.
   *
   * @method GET
   * @api
   */
  async checkTag ({ request }) {
    const tag = request.input('tag', '')

    return Database.from('users')
      .select('tag')
      .whereNotNull('tag')
      .where(tag ? { tag } : {})
      .map(({ tag } = {}) => tag)
  }
}

module.exports = UserController
