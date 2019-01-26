'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions')
const Request = use('App/Models/Request')

class GeneralRequestUpdate {
  get rules() {
    return {
      edit_reason: 'required'
    }
  }

  get messages() {
    return {
      required:
        'Você deve fornecer uma razão para a edição deste requerimento.',
      field_error:
        'Houve um erro ao editar o seu requerimento: campos obrigatórios estão incompletos.',
      token: 'Token inválido. Tente novamente.'
    }
  }

  async authorize() {
    const {
      request,
      response,
      params: { id },
      session,
      auth
    } = this.ctx
    const payload = request.all()

    const entity = await Request.findOrFail(id)

    // Verifica se o requerimento pode ser editado:
    if (
      (auth.user.id !== entity.author_id || entity.crh_state !== 'PENDING') &&
      !(await auth.user.hasPermission('ADMIN', true))
    ) {
      throw new HttpException('Acesso negado.', 403)
    }

    // Valida os campos e o token:
    const type = await entity.type().fetch()
    const { status } = await type.validateFields(payload)

    if (!status || !entity.validToken(payload.integrity_token)) {
      session.flash({
        danger: this.messages[!status ? 'field_error' : 'token']
      })
      return response.route('requests.edit', { id })
    }

    return true
  }

  async fails([{ message }]) {
    const { response, session } = this.ctx

    session.flash({ danger: message })
    response.redirect('back')
  }
}

module.exports = GeneralRequestUpdate
