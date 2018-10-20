'use strict'

const CrhRequest = use('App/Models/CrhRequest')

class TimelineController {
  /**
   * Mostra os itens da timeline de um determinado usuário.
   *
   * @method GET
   */
  async index ({ params: { id = null }, view }) {
    const items = await CrhRequest.query()
      .where({ affected_id: id })
      .orderByRaw('created_at DESC, id DESC')
      .with('type', (builder) => builder.select('id', 'alias', 'name', 'color', 'icon'))
      .with('state', (builder) => builder.select('id', 'name', 'icon', 'color', 'message'))
      .with('affected', (builder) => builder.select('id', 'username'))
      .with('author', (builder) => builder.select('id', 'username'))
      .fetch()

    return view.render('pages.users.timeline-items', { items: items.toJSON() })
  }
}

module.exports = TimelineController
