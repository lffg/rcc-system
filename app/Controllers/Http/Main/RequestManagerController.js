'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions')
const { RequestInterface } = use('App/Services/Request')
const Request = use('App/Models/Request')
const Database = use('Database')
const Logger = use('Logger')

class RequestManagerController {
  all () {
    return 'Hello from Manager.all'
  }

  async review ({ request, response, params: { id, mode }, session, auth }) {
    if (!(await auth.user.hasPermission('CRH', true)) || !['approve', 'reject'].includes(mode)) {
      throw new HttpException('Acesso negado.', 403)
    }

    const entity = await Request.findOrFail(id)
    const transaction = await Database.beginTransaction()

    if (request.input('integrity_token') !== entity.integrity_token) {
      session.flash({ danger: 'Este requerimento foi atualizado enquanto você o revisava. Tente novamente.' })
      return response.redirect('back')
    }

    try {
      await RequestInterface[mode]({
        payload: { ...request.all(), type_id: entity.type_id },
        request: entity,
        transaction,
        authUser: auth.user
      })

      await transaction.commit()
      session.flash({ success: 'Operação realizada com sucesso.' })
    } catch ({ message }) {
      await transaction.rollback()
      Logger.crit('[CRH] Erro ao revisar a requisição. Usuário: %s | Erro: %s | S: %s', auth.user.username, message)
      session.flash({ danger: 'Houve um erro ao tentar revisar o requerimento. Tente novamente.' })
    }

    return response.redirect('back')
  }
}

module.exports = RequestManagerController
