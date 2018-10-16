'use strict'

const Route = use('Route')

/**
 * ---------------------------------------------------------------------
 * General API Routes
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  Route.get('check-user', 'UserController.check')
  Route.get('near-positions', 'UserPositionController.check')
})
  .middleware(['auth'])
  .namespace('Api')
  .prefix('api')
