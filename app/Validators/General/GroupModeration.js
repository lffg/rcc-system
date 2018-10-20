'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions')
const User = use('App/Models/User')

class GroupModeration {
  async authorize () {
    const { request, response, params: { id }, session, auth } = this.ctx

    const username = request.input('username', '')

    try {
      await User.findByOrFail('username', username)
    } catch (e) {
      session.flash({ danger: `O usuário ${username} não existe.` })
      return response.redirect('back')
    }

    if (!(await auth.user.isModerator(id) || await auth.user.hasPermission('ADMIN', true))) {
      throw new HttpException('Acesso negado.', 403)
    }

    return true
  }

  get rules () {
    return {
      'username': 'required'
    }
  }

  get messages () {
    return {
      'username.required': 'Você deve fornecer o nome de usuário para completar a ação.'
    }
  }

  async fails (errorMessages) {
    const { response, session } = this.ctx
    const [{ message }] = errorMessages

    session.flash({ danger: message })
    return response.redirect('back')
  }
}

module.exports = GroupModeration
