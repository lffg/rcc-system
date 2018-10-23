'use strict'

const RequestController = use('App/Models/RequestController')
const { fullSplitNicks } = use('App/Helpers/split-nicks')
const { CreateInterface } = use('App/Services/Request')
const RequestType = use('App/Models/RequestType')
const User = use('App/Models/User')

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
  async store ({ request, response, session }) {
    const data = request.all()

    const { controller, type } = await CreateInterface.getInstances(data.controller_id, data.type_id)

    // Cria uma requisição a cada usuário:
    const splittedNicks = await fullSplitNicks(data.receivers, true)
    for (const username of splittedNicks) {
      // Pega o usuário, criando um caso nenhum existir.
      const user = await User.findOrCreate(
        { username },
        { username, synthetically_created: true }
      )

      // Cria a requisição:
      await CreateInterface.create(controller, type, {
        ...data, receiver_id: user.id
      })
    }

    session.flash({
      success: 'Requerimento(s) criado(s) com sucesso. Aguarde a notificação de aprovação/recusa por um membro do Centro de Recursos Humanos.'
    })
    return response.route('requests.index')
  }
}

module.exports = RequestCreateController
