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
  Route.get('req/:id/reply', 'RequestEntityController.reply').as('requests.reply')
  Route.post('req/:id/reply', 'RequestEntityController.postReply')
  Route.get('req/:id/edit', 'RequestEntityController.edit').as('requests.edit')
  Route.post('req/:id/edit', 'RequestEntityController.update')
})
  .middleware(['auth'])
  .namespace('Main')
  .prefix('crh')

/**
 * ---------------------------------------------------------------------
 * Criação das requisições.
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  Route.get('/', 'RequestCreateController.create').as('requests.create')

  // AJAX calls:
  Route.route('goto/:step', 'RequestCreateController.goto', ['GET', 'POST'])
    .validator('General/RequestCreate').as('requests.create:goto')

  // Save:
  Route.post('save', 'RequestCreateController.store')
    .validator('General/RequestCreate').as('requests.store')
})
  .middleware(['auth'])
  .namespace('Main')
  .prefix('crh/requests/new')

const RequestType = use('App/Models/RequestType')
Route.get('request-types', async ({ view }) => {
  const types = await RequestType.query().fetch()

  return view.render('pages.requests.types', { types: types.toJSON() })
}).middleware(['auth'])
