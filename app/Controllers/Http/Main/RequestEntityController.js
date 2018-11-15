'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions')
const { RequestInterface } = use('App/Services/Request')
const RequestType = use('App/Models/RequestType')
const Request = use('App/Models/Request')
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
      Logger.crit('[CRH] Erro ao editar a requisição. Usuário: %s | Erro: %s | S: %s', auth.user.username, message)
      session.flash({ danger: 'Houve um erro ao tentar atualizar o requerimento. Tente novamente.' })
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
      .select('*')
      .from('request_reviews')
      .where({ request_id: requestId })
      .orderBy('created_at', 'DESC')
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
