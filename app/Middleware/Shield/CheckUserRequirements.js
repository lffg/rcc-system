'use strict'

const Route = use('Route')

// Checa se o e-mail do usuário está confirmado e se ele pode utilizar o System.
class CheckUserRequirements {
  async handle ({ request, response, session, auth }, next) {
    try {
      await auth.check()
    } catch (e) {
      return next()
    }

    const { allowed, disallowReason: reason = null, is_verified_email: verified } = auth.user.toJSON()

    // Caso o usuário deva ser deslogado:
    if (!allowed) {
      await auth.logout()

      session.flash({
        danger: (
          `O seu acesso ao System foi revogado pelo seguinte motivo: ${reason}` ||
          'O seu acesso ao System foi revogado por alguma razão desconhecida.'
        )
      })

      return response.route('login')
    }

    // Sets the "banned until" field back to zero if necessary.
    if (auth.user.banned_until !== 0 && auth.user.banned_until < Date.now()) {
      auth.user.banned_until = 0
      await auth.user.save()
    }

    // Check if the user's e-mail must be verified:
    if (!(new RegExp(Route.url('verify-email'))).test(request.url())) {
      if (!verified) {
        session.flash({ danger: 'Para usar o System, você deve confirmar o seu e-mail.' })
        return response.route('verify-email')
      }
    }

    return next()
  }
}

module.exports = CheckUserRequirements
