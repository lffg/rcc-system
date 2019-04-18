const { HttpException } = use('@adonisjs/generic-exceptions')
const RequestController = use('App/Models/RequestController')
const Filters = use('App/Services/Request/Filters')
const Request = use('App/Models/Request')
const Database = use('Database')

class RequestHttpController {
  /**
   * Mostra a página-índice do Centro de Recursos Humanos.
   *
   * @method GET
   */
  async index({ view }) {
    const controllers = await RequestController.query()
      .where('is_crh', true)
      .select('*')
      .fetch()

    const lastRequests = await Database.select([
      'req.id',
      'req.crh_state as state',
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
      .where('req.is_crh', true)
      .orderByRaw('req.created_at DESC')
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
  async all({ request, params: { controllerSlug = null }, view }) {
    const { author, receiver, page = 1 } = request.all()

    const controllers = await RequestController.query()
      .select(['name', 'slug'])
      .where('is_crh', true)
      .fetch()
      .then((controllers) => controllers.toJSON())

    const { name: currentController } =
      controllerSlug === null
        ? {}
        : controllers.find(({ slug }) => slug === controllerSlug) || {}

    if (controllerSlug !== null && !currentController) {
      throw new HttpException('Controller não encontrado.', 404)
    }

    const requests = await Request.query()
      .whereHas('controller', (builder) =>
        builder.where({
          is_crh: true,
          ...(controllerSlug ? { slug: controllerSlug } : {})
        })
      )
      .whereHas('author', (builder) => Filters.username(builder, author))
      .whereHas('receiver', (builder) => Filters.username(builder, receiver))
      .with('type', (builder) =>
        builder.select('id', 'timeline_title', 'name', 'icon', 'color')
      )
      .with('author', (builder) => builder.select('id', 'username'))
      .with('receiver', (builder) => builder.select('id', 'username'))
      .orderByRaw('created_at DESC')
      .paginate(Math.abs(page), 35)

    return view.render('pages.requests.all', {
      requests: requests.toJSON(),
      currentController,
      controllers
    })
  }
}

module.exports = RequestHttpController
