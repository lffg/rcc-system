'use strict'

const User = use('App/Models/User')
const Log = use('Log')

class Admin {
  async handle ({ auth }, next) {
    try {
      await auth.check()
    } catch (e) {
      return this._block(...arguments)
    }

    const user = await User.findOrFail(auth.user.id)

    if (!await user.hasGroup('ADMIN')) {
      return this._block(...arguments)
    }

    await this._logAccess(...arguments)
    return next()
  }

  _block ({ session, response }) {
    session.flash({ danger: 'Acesso negado.' })
    return response.route('index')
  }

  async _logAccess ({ request, session, auth }) {
    const access = session.get('admin_access', {})

    // Se já estiver feito um log com o mesmo ip atual e em menos de um dia e meio, passe.
    if (access.time > Date.now() - 1000 * 60 * 60 * 24 * 1.5 && access.ip === request.ip()) {
      return
    }

    session.put('admin_access', { time: Date.now(), ip: request.ip() })

    await Log.log(auth.user.id, request.ip(), {
      message: 'Acesso à páginas da Administração do site'
    })
  }
}

module.exports = Admin
