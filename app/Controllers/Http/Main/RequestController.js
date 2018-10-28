'use strict'

const RequestController = use('App/Models/RequestController')
const Database = use('Database')

class RequestHttpController {
  /**
   * Mostra a página-índice do Centro de Recursos Humanos.
   *
   * @method GET
   */
  async index ({ view }) {
    const controllers = await RequestController.query()
      .whereNot('is_crh', false)
      .select('*')
      .fetch()

    const lastRequests = await Database
      .select([
        'req.id',
        'req.created_at as date',
        'A.username as author',
        'R.username as receiver',
        'T.timeline_title as title',
        'T.color',
        'T.icon'
      ])
      .from('requests as req')
      .innerJoin('request_controllers as C', 'C.id', '=', 'req.controller_id')
      .innerJoin('request_types as T', 'T.id', '=', 'req.type_id')
      .innerJoin('users as A', 'A.id', '=', 'req.author_id')
      .innerJoin('users as R', 'R.id', '=', 'req.receiver_id')
      .whereNot('C.is_crh', false)
      .orderBy('req.created_at', 'DESC')
      .limit(20)

    return view.render('pages.requests.index', {
      controllers: controllers.toJSON(),
      lastRequests
    })
  }

  /**
   * Mostra uma página com todas as requisições.
   *
   * @method GET
   */
  async all ({ request, view }) {
    const page = Math.abs(request.input('page', 1))

    const requests = await Database
      .select([
        'req.*',
        'A.username as author',
        'R.username as receiver',
        'T.timeline_title as title',
        'T.color',
        'T.icon'
      ])
      .from('requests as req')
      .innerJoin('request_controllers as C', 'C.id', '=', 'req.controller_id')
      .innerJoin('request_types as T', 'T.id', '=', 'req.type_id')
      .innerJoin('users as A', 'A.id', '=', 'req.author_id')
      .innerJoin('users as R', 'R.id', '=', 'req.receiver_id')
      .whereNot('C.is_crh', false)
      .orderBy('req.created_at', 'DESC')
      .paginate(page, 50)

    return view.render('pages.requests.all', { requests })
  }
}

module.exports = RequestHttpController
