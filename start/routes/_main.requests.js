'use strict'

const Route = use('Route')

/**
 * ---------------------------------------------------------------------
 * Requisições.
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  // Geral:
  Route.get('/', 'RequestController.index').as('requests.index')
  Route.get('all/:controllerSlug?', 'RequestController.all').as('requests.all')
  Route.get('search', 'RequestController.search').as('requests.search')

  // Revisão (CRH):
  Route.get('review/all/:controllerSlug?', 'RequestManagerController.all').as('requests.review-all')
  Route.get('review/req/:id', 'RequestManagerController.review').as('requests.review')
  Route.post('review/req/:id', 'RequestManagerController.review')

  // Entidade:
  Route.get('req/:id', 'RequestEntityController.show').as('requests.show')

  // Criar entidade:
  Route.get('new', 'RequestCreateController.create').as('requests.create')
  Route.route('new/goto/:step', 'RequestCreateController.goto', ['GET', 'POST'])
    .validator('General/RequestCreate').as('requests.create:goto')
  Route.post('new/save', 'RequestCreateController.store')
    .validator('General/RequestCreate').as('requests.store')

  // Editar Entidade
  Route.get('req/:id/edit', 'RequestEntityController.edit').as('requests.edit')
  Route.post('req/:id/edit', 'RequestEntityController.update')
    .validator('General/RequestUpdate')

  // Resposta:
  Route.get('req/:id/reply', 'RequestReplyController.create').as('requests.reply')
  Route.post('req/:id/reply', 'RequestReplyController.store')
  Route.get('reply/:id/edit', 'RequestReplyController.edit').as('requests.edit-reply')
  Route.post('reply/:id/edit', 'RequestReplyController.update')
  Route.get('reply/:id/delete', 'RequestReplyController.delete').as('requests.delete-reply')
  Route.post('reply/:id/delete', 'RequestReplyController.destroy')
})
  .middleware(['auth'])
  .namespace('Main')
  .prefix('crh')

const RequestType = use('App/Models/RequestType')
Route.get('request-types', async ({ view }) => {
  const types = await RequestType.query().fetch()

  return view.render('pages.requests.types', { types: types.toJSON() })
}).middleware(['auth'])
