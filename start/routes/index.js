'use strict'

const Route = use('Route')

// Páginas de início:
Route.any('index.html', 'Main/DashboardController.index')
Route.any('/', 'Main/DashboardController.index').as('index')

require('./_admin')
require('./_api')
require('./_main')
require('./_main.requests')
require('./_main.session')
require('./_main.users')

const { RequestInterface } = require('../../app/Services/Request')

Route.get('/tests', async ({ request }) => {
  await RequestInterface.create(request.all())
  return 'OK'
})
