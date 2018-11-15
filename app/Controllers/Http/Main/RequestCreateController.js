'use strict'

const RequestController = use('App/Models/RequestController')
const { fullSplitNicks } = use('App/Helpers/split-nicks')
const { RequestInterface } = use('App/Services/Request')
const RequestType = use('App/Models/RequestType')
const User = use('App/Models/User')
const Database = use('Database')
const Logger = use('Logger')

class RequestCreateController {
  /**
   * Mostra a página (com formulário) para criar uma nova requisição.
   * @method GET
   */
  async create ({ view }) {
    const controllers = await RequestController.getControllers()
    return view.render('pages.requests.create', { controllers })
  }

  /**
   * Mostra uma parte específica do formulário usando um parâmetro da
   * URL.
   *
   * @method GET|POST
   */
  async goto ({ request, params: { step }, view }) {
    const data = request.only(['author_id', 'controller_id', 'type_id', 'receivers'])
    const controller = await RequestController.getInfoFor(data.controller_id)

    switch (parseInt(step)) {
      case 1:
        const controllers = await RequestController.getControllers()
        return view.render('pages.requests.ajax-first-part', { controllers, data })
      case 2:
        const types = await RequestType.findTypesFor(data.controller_id)
        return view.render('pages.requests.ajax-second-part', { controller, types, data })
      case 3:
        const type = await RequestType.getInfoFor(data.type_id, true)

        return view.render('pages.requests.ajax-third-part', {
          controller, type, data, nicks: await fullSplitNicks(data.receivers, undefined, true)
        })
    }
  }

  /**
   * Salva a nova requisição, executando todos os processos da API de
   * criação de requisições.
   *
   * @method POST
   */
  async store ({ request, response, session, auth: { user: { username } } }) {
    const transaction = await Database.beginTransaction()
    const data = request.all()

    try {
      const splittedNicks = await fullSplitNicks(data.receivers, true)
      for (const username of splittedNicks) {
        const user = await User.findOrCreate(
          { username },
          { username, synthetically_created: true }
        )
        await RequestInterface.create({
          payload: { ...data, receiver_id: user.id }, transaction
        })
      }

      await transaction.commit()
    } catch ({ message }) {
      await transaction.rollback()
      Logger.crit('[CRH] Erro ao criar a requisição. Usuário: %s | Erro: %s', username, message)
      session.flash({ danger: 'Houve um erro ao tentar criar o requerimento. Tente novamente.' })
      return response.route('requests.create')
    }

    session.flash({
      success: 'Requerimento(s) criado(s) com sucesso. Aguarde a notificação de aprovação/recusa por um membro do Centro de Recursos Humanos.'
    })
    return response.route('requests.all')
  }
}

module.exports = RequestCreateController
