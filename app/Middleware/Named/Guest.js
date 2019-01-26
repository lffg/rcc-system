'use strict'

class Guest {
  async handle({ response, session, auth }, next) {
    try {
      await auth.check()
    } catch (e) {
      return next()
    }

    session.flash({ info: 'Você já está autenticado!' })
    return response.route('index')
  }
}

module.exports = Guest
