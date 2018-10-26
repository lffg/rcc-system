'use strict'

const Route = use('Route')

// Páginas de início:
Route.any('index.html', 'Main/DashboardController.index')
Route.any('/', 'Main/DashboardController.index').as('index')

require('./_api')
require('./_main')
require('./_admin')
require('./_main.auth')
require('./_main.users')
require('./_main.session')
require('./_main.requests')

const { RequestInterface } = require('../../app/Services/Request')

Route.get('/tests', async ({ request }) => {
  await RequestInterface.create(request.all())
  return 'OK'
})
