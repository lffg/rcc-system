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
