'use strict'

const { create: createRequest, prepare } = use('App/Services/Request')
const RequestController = use('App/Models/RequestController')
const RequestType = use('App/Models/RequestType')
const User = use('App/Models/User')

/**
 * Split a string with slashes.
 *
 * @param  {string} nicks
 * @param  {boolean} onlyArray
 * @return {object}
 */
function splitNicks (nicks = '', onlyArray = false) {
  const entries = [...new Set(nicks.split(/\\|\//).map((s) => s.trim()).filter((s) => /\S/.test(s)))]
  const string = entries.join(' / ')
  if (onlyArray) return entries
  return { entries, string }
}

class RequestCreateController {
  async create ({ view }) {
    const controllers = await RequestController.getControllers()
    return view.render('pages.requests.create', { controllers })
  }

  async ajaxPart ({ request, view }) {
    const toPart = parseInt(request.url().replace(/.+?-(\d+)$/, '$1'))
    const data = request.only(['author_id', 'controller_id', 'type_id', 'receivers'])

    const controller = await RequestController.getInfoFor(data.controller_id)

    switch (toPart) {
      case 1:
        const controllers = await RequestController.getControllers()
        return view.render('pages.requests.ajax-first-part', { controllers, data })
      case 2:
        const types = await RequestType.findTypesFor(data.controller_id)
        return view.render('pages.requests.ajax-second-part', { controller, types, data })
      case 3:
        const type = await RequestType.getInfoFor(data.type_id, true)

        return view.render('pages.requests.ajax-third-part', {
          controller, type, data, nicks: splitNicks(data.receivers)
        })
    }
  }

  async store ({ request, response, session }) {
    const data = request.all()
    let controller, type

    // Verifica se a requisição pode ser criada:
    try {
      const { controller: c, type: t } = await prepare(data)

      controller = c
      type = t
    } catch (e) {
      throw e
    }

    // Cria uma requisição a cada usuário:
    for (const username of splitNicks(data.receivers, true)) {
      // Pega o usuário, criando um caso nenhum existir.
      const user = await User.findOrCreate(
        { username },
        { username, synthetically_created: true }
      )

      // Cria a requisição:
      await createRequest(controller, type, {
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
