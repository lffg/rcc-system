'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions')
const RequestType = use('App/Models/RequestType')
const Request = use('App/Models/Request')
const Database = use('Database')

class RequestEntityController {
  async show ({ params: { id }, view }) {
    const entity = await Queries.entity(id)
    if (!entity.is_crh) throw new HttpException('Acesso negado.', 403)

    const reviews = await Queries.reviews(id)
    return view.render('pages.requests.show-entity', { entity, reviews })
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

  async update () {
    return 'postado'
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
}

module.exports = RequestEntityController
