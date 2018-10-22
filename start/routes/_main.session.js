'use strict'

const Route = use('Route')

/**
 * ---------------------------------------------------------------------
 * Autênticação
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  Route.get('login', 'AuthController.login')
    .middleware(['guest']).as('login')

  Route.post('login', 'AuthController.postLogin')
    .middleware(['guest']).validator('General/AuthLogin')

  Route.get('register', 'AuthController.register')
    .middleware(['guest']).as('register')

  Route.post('register', 'AuthController.postRegister')
    .middleware(['guest']).validator('General/AuthRegister')

  Route.get('logout', 'AuthController.logout')
    .middleware(['auth']).as('logout')
})
  .namespace('Main')
  .prefix('session')

/**
 * ---------------------------------------------------------------------
 * Configurações
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  Route.get('/', 'ConfigController.main').as('user-config.index')
  Route.post('/', 'ConfigController.saveMain').validator('General/ConfigMain')

  Route.get('email', 'ConfigController.email').as('user-config.email')
  Route.post('email', 'ConfigController.saveEmail').validator('General/ConfigEmail')

  Route.get('password', 'ConfigController.password').as('user-config.password')
  Route.post('password', 'ConfigController.savePassword').validator('General/ConfigPassword')
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
  Route.get('go/:notificationId', 'NotificationController.go').as('notifications.go')
  Route.post('delete/:id', 'NotificationController.destroy').as('notifications.destroy')
})
  .middleware(['auth'])
  .namespace('Main')
  .prefix('notifications')

/**
 * ---------------------------------------------------------------------
 * Confirmação do E-Mail.
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  Route.get('/', 'VerifyEmailController.index')
    .middleware(['auth'])
    .as('verify-email')

  Route.post('send', 'VerifyEmailController.send')
    .middleware(['auth'])
    .validator('General/ConfirmEmail')
    .as('verify-email.send')

  Route.get('confirm/:token/:id', 'VerifyEmailController.confirm')
    .as('verify-email.confirm')
})
  .namespace('Main')
  .prefix('session/verify-email')
