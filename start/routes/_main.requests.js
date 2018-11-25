'use strict'

const Route = use('Route')

/**
 * ---------------------------------------------------------------------
 * Requisições.
 * ---------------------------------------------------------------------
 */

Route.group(() => {
  // Geral:
  Route.get('/', 'RequestController.index').as('requests.index')
  Route.get('all/:controllerSlug?', 'RequestController.all').as('requests.all')
  Route.get('search', 'RequestController.search').as('requests.search')

  // Ver entidade:
  Route.get('req/:id', 'RequestEntityController.show').as('requests.show')

  // Criar entidade:
  Route.get('new', 'RequestEntityController.create').as('requests.create')
  Route.post('new/goto/:step', 'RequestEntityController.gotoCreatePart')
    .validator('General/RequestCreate').as('requests.create:goto')
  Route.post('new/save', 'RequestEntityController.store')
    .validator('General/RequestCreate').as('requests.store')

  // Editar Entidade
  Route.get('req/:id/edit', 'RequestEntityController.edit').as('requests.edit')
  Route.post('req/:id/edit', 'RequestEntityController.update')
    .validator('General/RequestUpdate')

  // Resposta:
  Route.get('req/:id/reply', 'RequestReplyController.create').as('requests.reply')
  Route.post('req/:id/reply', 'RequestReplyController.store')
  Route.get('reply/:id/edit', 'RequestReplyController.edit').as('requests.edit-reply')
  Route.post('reply/:id/edit', 'RequestReplyController.update')
  Route.get('reply/:id/delete', 'RequestReplyController.delete').as('requests.delete-reply')
  Route.post('reply/:id/delete', 'RequestReplyController.destroy')

  // Revisão (CRH):
  Route.get('review/all/:controllerSlug?', 'RequestManagerController.all').as('requests.review-all')
  Route.post('review/req/:id/:mode', 'RequestManagerController.review').as('requests.review')

  // Refresh:
  Route.get('refresh/req/:id', 'RequestManagerController.refresh').as('requests.refresh')
})
  .middleware(['auth'])
  .namespace('Main')
  .prefix('crh')
