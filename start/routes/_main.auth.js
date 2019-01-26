'use strict'

const Route = use('Route')

/**
 * ---------------------------------------------------------------------
 * Autênticação.
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  Route.get('login', 'LoginController.login')
    .middleware(['guest'])
    .as('login')

  Route.post('login', 'LoginController.postLogin')
    .middleware(['guest'])
    .validator('General/AuthLogin')

  Route.get('logout', 'LoginController.logout')
    .middleware(['auth'])
    .as('logout')

  Route.get('register', 'RegisterController.register')
    .middleware(['guest'])
    .as('register')

  Route.post('register', 'RegisterController.postRegister')
    .middleware(['guest'])
    .validator('General/AuthRegister')
}).namespace('Auth')

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

  Route.get('confirm/:token/:id', 'VerifyEmailController.confirm').as(
    'verify-email.confirm'
  )
})
  .namespace('Auth')
  .prefix('session/auth/verify-email')
