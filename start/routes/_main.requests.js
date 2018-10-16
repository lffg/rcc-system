'use strict'

const Route = use('Route')

/**
 * ---------------------------------------------------------------------
 * MAIN.REQUESTS :: Main
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
 * MAIN.REQUESTS :: Creation
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  Route.get('/', 'RequestCreateController.create').as('requests.create')
  Route.post('save', 'RequestCreateController.store')
    .validator('General/RequestCreate').as('requests.store')

  // AJAX calls:
  Route.post('part-1', 'RequestCreateController.ajaxPart')
    .as('requests.create:part-1')
  Route.post('part-2', 'RequestCreateController.ajaxPart')
    .validator('General/RequestCreate').as('requests.create:part-2')
  Route.post('part-3', 'RequestCreateController.ajaxPart')
    .validator('General/RequestCreate').as('requests.create:part-3')
})
  .middleware(['auth'])
  .namespace('Main')
  .prefix('crh/requests/create')

const RequestType = use('App/Models/RequestType')
Route.get('request-types', async ({ view }) => {
  const types = await RequestType.query().fetch()

  return view.render('pages.requests.types', { types: types.toJSON() })
}).middleware(['auth'])
