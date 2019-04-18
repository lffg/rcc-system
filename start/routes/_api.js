const Route = use('Route')

/**
 * ---------------------------------------------------------------------
 * API.
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  Route.get('check-user', 'UserController.check')
  Route.get('check-tag', 'UserController.checkTag')

  Route.get('near-positions', 'UserPositionController.check')
})
  .middleware(['auth'])
  .namespace('Api')
  .prefix('api')
