'use strict'

const crypto = require('crypto')

const User = use('App/Models/User')
const Mail = use('Mail')
const Env = use('Env')

class VerifyEmailController {
  verify ({ response, session, auth: { user } }) {
    if (user.is_verified_email) {
      session.flash({ info: 'Seu e-mail já está verificado.' })
      response.route('index')
      return true
    }
  }

  async index ({ view }) {
    if (this.verify(...arguments)) return
    return view.render('pages.users.verify-email')
  }

  async send ({ request, response, session, auth: { user } }) {
    if (this.verify(...arguments)) return

    const chars = `${Env.get('APP_KEY')}-${Date.now()}-${Math.random()}`
    const token = crypto.createHash('sha1').update(chars).digest('hex')
    const email = request.input('email', null)
    const limit = Date.now() + 1000 * 60 * 60

    if (Date.now() < (user.last_verification + (1000 * 60 * 5))) {
      session.flash({ danger: 'Um e-mail de verificação foi enviado para o seu e-mail há menos de 5 minutos. Verifique-o antes de solicitar um novo link de confirmação.' })
      return response.redirect('back')
    }

    user.email = email !== user.email ? email : user.email
    user.last_verification = Date.now()
    user.email_token_limit = limit
    user.email_token = token
    await user.save()

    await Mail.send([
      'emails.verify-email',
      'emails.verify-email-text'
    ], { user, token }, (message) => {
      message.to(user.email)
      message.from('noreply@rccsystem.com', 'RCC System')
      message.subject(`[RCC System] Confirme o seu e-mail, ${user.username}!`)
    })

    session.flash({ success: 'Um link de confirmação para a sua conta foi enviado para o seu e-mail.' })
    return response.redirect('back')
  }

  async confirm ({ response, params: { id, token }, session, auth }) {
    let user
    try {
      user = await User.findOrFail(id)
    } catch (e) {
      session.flash({ danger: 'Link de ativação inválido.' })
    }

    if (token === user.email_token) {
      if (Date.now() < user.email_token_limit) {
        user.is_verified_email = true
        user.last_verification = 0
        user.email_token_limit = 0
        user.email_token = null
        await user.save()

        session.flash({ success: 'E-mail confirmado com sucesso! Seja bem-vindo ao System. =)' })
        try {
          await auth.check()
          return response.route('index')
        } catch (e) {
          return response.route('login')
        }
      }

      session.flash({ danger: 'Link de ativação expirado por tempo. Tente novamente.' })
      return response.route('verify-email')
    }

    session.flash({ danger: 'Link de ativação inválido.' })
    return response.route('verify-email')
  }
}

module.exports = VerifyEmailController
