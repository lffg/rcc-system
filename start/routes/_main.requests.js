'use strict'

const Route = use('Route')

/**
 * ---------------------------------------------------------------------
 * Requisições.
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  Route.get('/', 'RequestController.index').as('requests.index')
  Route.get('all', 'RequestController.all').as('requests.all')
  Route.get('search', 'RequestController.search').as('requests.search')
})
  .middleware(['auth'])
  .namespace('Main')
  .prefix('crh')

Route.group(() => {
  Route.get(':id', 'RequestInstanceController.show').as('requests.show')
  Route.post(':id/comment', 'RequestInstanceController.comment').as('requests.comment')

  Route.get(':id/edit', 'RequestInstanceController.edit').as('requests.edit')
  Route.post(':id/edit', 'RequestInstanceController.update')

  Route.get(':id/review', 'RequestInstanceController.review').as('requests.review')
  Route.post(':id/review', 'RequestInstanceController.review')
})

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
