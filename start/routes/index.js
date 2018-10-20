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
