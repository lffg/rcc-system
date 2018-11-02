'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions')
const Database = use('Database')

class RequestEntityController {
  async show ({ request, params: { id }, view }) {
    const entity = await Queries.entity(id)
    if (!entity) throw new HttpException('Requerimento não encontrado.', 404)

    if (request.input('mode') === 'edit') {
      return view.render('pages.requests.edit-entity', { entity })
    }

    const reviews = await Queries.reviews(id)
    return view.render('pages.requests.show-entity', { entity, reviews })
  }
}

class Queries {
  static async entity (id = null) {
    return Database
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
      .innerJoin('request_controllers as C', 'C.id', '=', 'req.controller_id')
      .innerJoin('request_types as T', 'T.id', '=', 'req.type_id')
      .innerJoin('users as author', 'author.id', '=', 'req.author_id')
      .innerJoin('positions as AP', 'AP.id', '=', 'author.position_id')
      .innerJoin('users as receiver', 'receiver.id', '=', 'req.receiver_id')
      .leftJoin('users as reviwer', 'reviwer.id', '=', 'req.reviwer_id')
      .where('req.id', id)
      .first()
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
