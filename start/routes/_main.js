'use strict'

const Route = use('Route')

/**
 * ---------------------------------------------------------------------
 * Notícias.
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  Route.get('/', 'PostController.index').as('posts.index')
  Route.get(':slug', 'PostController.show').as('posts.show')

  Route.get('create', 'PostController.create')
    .as('posts.create')
    .middleware(['admin'])
  Route.post('create', 'PostController.store')
    .as('posts.store')
    .middleware(['admin'])

  Route.get('edit/:slug', 'PostController.edit')
    .as('posts.edit')
    .middleware(['admin'])
  Route.post('edit/:slug', 'PostController.update')
    .as('posts.update')
    .middleware(['admin'])
  Route.get('delete/:slug', 'PostController.destroy')
    .as('posts.delete')
    .middleware(['admin'])
})
  .middleware(['auth'])
  .namespace('Main')
  .prefix('news')

/**
 * ---------------------------------------------------------------------
 * Páginas publicas-privadas.
 * ---------------------------------------------------------------------
 */

Route.on('site/about')
  .render('pages.public-private.about')
  .as('site-about')
Route.on('site/terms')
  .render('pages.public-private.terms')
  .as('site-terms')
Route.on('site/privacy')
  .render('pages.public-private.privacy')
  .as('site-privacy')

/**
 * ---------------------------------------------------------------------
 * Tickets de erro.
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  Route.get('error-ticket', 'ErrorTicketController.index').as('error-ticket')
  Route.post('error-ticket', 'ErrorTicketController.store').validator(
    'General/ErrorTicket'
  )
})
  .middleware(['auth'])
  .namespace('Main')
