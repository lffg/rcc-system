'use strict'

const Route = use('Route')

/**
 * ---------------------------------------------------------------------
 * Principal.
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  Route.get('/', 'IndexController.index').as('admin')
})
  .middleware(['auth', 'admin'])
  .namespace('Admin')
  .prefix('admin')

/**
 * ---------------------------------------------------------------------
 * Usuários.
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  Route.get('/', 'UserController.index').as('admin:users.index')
  Route.get(':id', 'UserController.show').as('admin:users.show')
  Route.get(':id/logs', 'UserController.logs').as('admin:users.logs')

  Route.get(':id/edit', 'UserController.edit').as('admin:users.edit')
  Route.post(':id/edit', 'UserController.update').validator('Admin/EditUser')
})
  .middleware(['auth', 'admin'])
  .namespace('Admin')
  .prefix('admin/users')

/**
 * ---------------------------------------------------------------------
 * Grupos.
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  Route.get('/', 'GroupController.index').as('admin:groups.index')

  Route.get('create', 'GroupController.create').as('admin:groups.create')
  Route.post('create', 'GroupController.store').validator('Admin/CreateGroup')

  Route.get(':id', 'GroupController.show').as('admin:groups.show')
  Route.post(':id', 'GroupController.update').validator('Admin/UpdateGroup')

  Route.get(':id/members', 'GroupController.members').as('admin:groups.members')
  Route.get(':id/permissions', 'GroupController.permissions').as(
    'admin:groups.permissions'
  )

  Route.get('delete/:id', 'GroupController.delete').as('admin:groups.delete')
  Route.post('delete/:id', 'GroupController.destroy')

  Route.get('change-order/:id/:mode', 'GroupController.order').as(
    'admin:groups.order'
  )

  Route.post(':id/add-user', 'GroupController.addUser')
    .as('admin:groups.add-user')
    .validator('Admin/AddUserToGroup')

  Route.post(':id/remove-user', 'GroupController.removeUser')
    .as('admin:groups.remove-user')
    .validator('Admin/CheckUsername')

  Route.post(':id/add-moderator', 'GroupController.addModerator')
    .as('admin:groups.add-moderator')
    .validator('Admin/CheckUsername')

  Route.post(':id/remove-moderator', 'GroupController.removeModerator')
    .as('admin:groups.remove-moderator')
    .validator('Admin/CheckUsername')
})
  .middleware(['auth', 'admin'])
  .namespace('Admin')
  .prefix('admin/groups')
