'use strict'

const Route = use('Route')

/**
 * ---------------------------------------------------------------------
 * USERS.MAIN :: Users
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  Route.get('/', 'UserController.index').as('users.index')
  Route.get('see', 'UserController.show').as('users.show')

  Route.get('find', 'UserController.find').as('users.find')
  Route.post('find', 'UserController.findAction')
  Route.get('find/autocomplete', 'UserController.autocomplete').as('users.find-autocomplete')

  Route.get('timeline/:id', 'TimelineController.index').as('timeline.index')
})
  .middleware(['auth'])
  .namespace('Main')
  .prefix('users')

/**
 * ---------------------------------------------------------------------
 * USERS.MAIN :: Groups
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  Route.get('/', 'GroupController.index').as('groups.index')
  Route.get(':id', 'GroupController.show').as('groups.show')

  Route.post(':id/add-user', 'GroupController.addUser')
    .as('groups.add-user').validator('General/GroupModeration')

  Route.post(':id/remove-user', 'GroupController.removeUser')
    .as('groups.remove-user').validator('General/GroupModeration')
})
  .middleware(['auth'])
  .namespace('Main')
  .prefix('groups')

/**
 * ---------------------------------------------------------------------
 * USERS.MAIN :: Positions
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  Route.get('/', 'PositionController.index').as('positions.index')

  Route.get('users', 'PositionController.users').as('positions.users')
  Route.get('users/:positionId?', 'PositionController.showUsers').as('positions.showUsers')
  Route.get('users/all/:positionId?', 'PositionController.showAllUsers').as('positions.showAllUsers')

  Route.get('list', 'PositionController.list').as('positions.list')
})
  .middleware(['auth'])
  .namespace('Main')
  .prefix('positions')
