'use strict'

const ErrorTicket = use('App/Models/ErrorTicket')
const User = use('App/Models/User')

class ErrorTicketController {
  /**
   * Redireciona os usuários para o início com uma mensagem de erro.
   *
   * @method GET
   */
  index ({ response, session }) {
    session.flash({ danger: 'Nenhum dado foi salvo. Você deve submeter os dados pelo formulário.' })
    return response.route('index')
  }

  /**
   * Salva o ticket de erro.
   *
   * @method POST
   */
  async store ({ request, response, session, auth }) {
    const { type, img, message, url } = request.all()
    const user = await User.findOrFail(auth.user.id)

    const ticket = new ErrorTicket()
    ticket.message    = message
    ticket.error_type = type
    ticket.image_url  = img
    ticket.page_url   = url
    await user.tickets().save(ticket)

    session.flash({ success: 'Obrigado! Em breve os desenvolvedores irão verificar o seu pedido.' })
    return response.redirect('back')
  }
}

module.exports = ErrorTicketController
