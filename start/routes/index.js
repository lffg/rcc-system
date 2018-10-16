'use strict'

const Route = use('Route')

// Index:
Route.any('index.html', 'Main/DashboardController.index')
Route.any('/', 'Main/DashboardController.index').as('index')

require('./_admin')
require('./_api')
require('./_main')
require('./_main.requests')
require('./_main.session')
require('./_main.users')

const CreateRequest = require('../../app/Services/Request/CreateRequest')

Route.get('/login', async ({ request, auth }) => {
  const uid = request.input('uid')
  await auth.logout()
  await auth.loginViaId(uid)
  return true
})

const RequestController = use('App/Models/RequestController')

Route.get('/tests', async () => {
  return RequestController.getControllers(true)
})
