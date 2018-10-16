'use strict'

const User = use('App/Models/User')

class UserController {
  async check ({ request, response }) {
    const username = request.input('u', '')

    try {
      await User.findByOrFail('username', username)
    } catch (e) {
      return response.status(404).json({ status: false, username, error: 'User not found' })
    }

    return { status: true, username }
  }
}

module.exports = UserController
