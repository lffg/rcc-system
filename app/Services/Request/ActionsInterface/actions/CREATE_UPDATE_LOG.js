'use strict'

/**
 * Action responsável por criar um log de atualização, indicando que o
 * requerimento em questão foi atualizado.
 * Usa a propriedade "edit_reason" para criar um novo registro, indicando
 * o motivo da edição, anotanto também o nick do usuário que editou.
 */

module.exports = () => ({
  requiresTransaction: true,
  requiresController: false,
  requiresAuthUser: true,
  requiresRequest: true,
  requiresReview: false,
  requiresType: false,
  caller
})

async function caller({ transaction, authUser, request, payload }) {
  await request.editLogs().create(
    {
      edit_reason: payload.edit_reason,
      author_id: authUser.id
    },
    transaction
  )
}
