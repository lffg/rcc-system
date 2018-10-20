'use strict'

const RequestController = use('App/Models/RequestController')
const Request = use('App/Models/Request')

class RequestHttpController {
  /**
   * Mostra a página-índice do Centro de Recursos Humanos.
   *
   * @method GET
   */
  async index ({ view }) {
    const controllers = await RequestController.query()
      .select('*')
      .fetch()

    const lastRequests = await Request.query()
      .select(['type_id', 'receiver_id', 'author_id'])
      .with('type', (builder) => builder.select('id', 'timeline_title', 'color', 'icon'))
      .with('author', (builder) => builder.select('id', 'username'))
      .with('receiver', (builder) => builder.select('id', 'username'))
      .limit(20)
      .orderBy('created_at', 'DESC')
      .fetch()

    return view.render('pages.requests.index', {
      lastRequests: lastRequests.toJSON(),
      controllers: controllers.toJSON()
    })
  }
}

module.exports = RequestHttpController
