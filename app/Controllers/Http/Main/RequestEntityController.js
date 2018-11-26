'use strict'

const RequestController = use('App/Models/RequestController')
const { HttpException } = use('@adonisjs/generic-exceptions')
const { fullSplitNicks } = use('App/Helpers/split-nicks')
const { RequestInterface } = use('App/Services/Request')
const RequestType = use('App/Models/RequestType')
const Request = use('App/Models/Request')
const User = use('App/Models/User')
const Database = use('Database')
const Logger = use('Logger')

class RequestEntityController {
  async show ({ params: { id }, view }) {
    const entity = await Queries.entity(id)
    if (!entity.is_crh) throw new HttpException('Acesso negado.', 403)

    const reviews = await Queries.reviews(id)
    const editLogs = await Queries.editLogs(id)
    return view.render('pages.requests.show-entity', { entity, reviews, editLogs })
  }

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
   * @method POST
   */
  async gotoCreatePart ({ request, params: { step }, view }) {
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
      session.flash({ danger: message })
      return response.route('requests.create')
    }

    session.flash({
      success: 'Requerimento(s) criado(s) com sucesso. Aguarde a notificação de aprovação/recusa por um membro do Centro de Recursos Humanos.'
    })
    return response.route('requests.all')
  }

  async edit ({ params: { id }, view, auth }) {
    const entity = await Request.query()
      .with('receiver', (builder) => builder.select('id', 'username'))
      .with('author', (builder) => builder.select('id', 'username'))
      .where({ id })
      .firstOrFail()
      .then((entity) => entity.toJSON())

    if (
      (auth.user.id !== entity.author_id || entity.crh_state !== 'PENDING') &&
      !await auth.user.hasPermission('ADMIN', true)
    ) {
      throw new HttpException('Acesso negado.', 403)
    }

    const type = await RequestType.getInfoFor(entity.type_id, true)
    return view.render('pages.requests.edit', { type, entity })
  }

  async update ({ request, response, params: { id }, session, auth }) {
    const transaction = await Database.beginTransaction()
    const payload = request.all()

    try {
      const entity = await Request.findOrFail(id)

      await RequestInterface.update({
        payload: { ...payload, type_id: entity.type_id },
        request: entity,
        transaction,
        authUser: auth.user
      })

      await transaction.commit()
    } catch ({ message, stack }) {
      await transaction.rollback()
      session.flash({ danger: message })
      return response.route('requests.show', { id })
    }

    session.flash({ success: 'O requerimento foi atualizado com sucesso.' })
    return response.route('requests.show', { id })
  }
}

class Queries {
  static async entity (id = null) {
    const entity = await Database
      .select([
        'req.*',
        'C.name as controller_name',
        'T.timeline_title',
        'T.name as type_name',
        'T.color as color',
        'T.icon as icon',
        'author.id as author_id',
        'author.username as author',
        'AP.name as author_position',
        'receiver.username as receiver',
        'reviwer.username as reviwer'
      ])
      .from('requests as req')
      .innerJoin('request_controllers as C', 'C.id', '=', 'req.controller_id')
      .innerJoin('request_types as T', 'T.id', '=', 'req.type_id')
      .innerJoin('users as author', 'author.id', '=', 'req.author_id')
      .innerJoin('positions as AP', 'AP.id', '=', 'author.position_id')
      .innerJoin('users as receiver', 'receiver.id', '=', 'req.receiver_id')
      .leftJoin('users as reviwer', 'reviwer.id', '=', 'req.reviwer_id')
      .where('req.id', id)
      .first()

    if (!entity) throw new HttpException('Requerimento não encontrado.', 404)
    return entity
  }

  static async reviews (requestId = null) {
    return Database
      .select([
        'R.*',
        'A.username as author'
      ])
      .from('request_reviews as R')
      .innerJoin('users as A', 'R.author_id', '=', 'A.id')
      .where({ request_id: requestId })
      .orderBy('created_at', 'ASC')
  }

  static async editLogs (requestId = null) {
    return Database
      .select([
        'L.edit_reason',
        'L.created_at',
        'U.username as author'
      ])
      .from('request_edit_logs as L')
      .innerJoin('users as U', 'U.id', '=', 'L.author_id')
      .where({ request_id: requestId })
      .orderBy('L.created_at', 'DESC')
  }
}

module.exports = RequestEntityController
