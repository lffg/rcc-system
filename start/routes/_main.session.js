'use strict'

const Route = use('Route')

/**
 * ---------------------------------------------------------------------
 * Configurações.
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  Route.get('/', 'ConfigController.main').as('user-config.index')
  Route.post('/', 'ConfigController.saveMain').validator('General/ConfigMain')

  Route.get('email', 'ConfigController.email').as('user-config.email')
  Route.post('email', 'ConfigController.saveEmail').validator(
    'General/ConfigEmail'
  )

  Route.get('password', 'ConfigController.password').as('user-config.password')
  Route.post('password', 'ConfigController.savePassword').validator(
    'General/ConfigPassword'
  )
})
  .middleware(['auth'])
  .namespace('Main')
  .prefix('session/config')

/**
 * ---------------------------------------------------------------------
 * Mensagens Privadas.
 * ---------------------------------------------------------------------
 */
Route.group(() => {
  Route.get('/', 'PrivMsgController.index').as('privmsgs.index')
  Route.get('send', 'PrivMsgController.index').as('privmsgs.send')
})
  .middleware(['auth'])
  .namespace('Main')
  .prefix('privmsgs')

/**
 * ---------------------------------------------------------------------
 * Notificações.
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  Route.get(':userId', 'NotificationController.list').as('notifications.list')
  Route.get('go/:notificationId', 'NotificationController.go').as(
    'notifications.go'
  )
  Route.post('delete/:id', 'NotificationController.destroy').as(
    'notifications.destroy'
  )
})
  .middleware(['auth'])
  .namespace('Main')
  .prefix('notifications')
