'use strict'

const Route = use('Route')

/**
 * ---------------------------------------------------------------------
 * Requisições.
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  Route.get('/', 'RequestController.index').as('requests.index')
  Route.get('list/:slug', 'RequestController.list').as('requests.list')
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
  Route.post('save', 'RequestCreateController.store')
    .validator('General/RequestCreate').as('requests.store')

  // AJAX calls:
  Route.route('goto/:step', 'RequestCreateController.goto', [
    'POST', ...(process.env.NODE_ENV === 'development' ? ['GET'] : [])
  ])
    .validator('General/RequestCreate').as('requests.create:goto')
})
  .middleware(['auth'])
  .namespace('Main')
  .prefix('crh/requests/create')

const RequestType = use('App/Models/RequestType')
Route.get('request-types', async ({ view }) => {
  const types = await RequestType.query().fetch()

  return view.render('pages.requests.types', { types: types.toJSON() })
}).middleware(['auth'])
