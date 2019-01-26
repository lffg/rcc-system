'use strict'

const User = use('App/Models/User')

class AddUserToGroup {
  async authorize() {
    const { request, response, session } = this.ctx

    const username = request.input('username', '')

    try {
      await User.findByOrFail('username', username)
    } catch (e) {
      session.flash({ danger: `O usuário ${username} não existe.` })
      return response.redirect('back')
    }

    return true
  }

  get rules() {
    return {
      username: 'required',
      is_moderator: 'required|in:0,1'
    }
  }

  get messages() {
    return {
      'username.required':
        'Para adicionar um usuário, é necessário prover o nome do usuário.',
      'is_moderator.required':
        'Você deve prover um valor (0|1) especificando o nível do usuário.',
      'is_moderator.in':
        'O nível de usuário é inválido para adicionar um novo usuário.'
    }
  }

  async fails(errorMessages) {
    const { response, session } = this.ctx
    const [{ message }] = errorMessages

    session.flash({ danger: message })
    return response.redirect('back')
  }
}

module.exports = AddUserToGroup
