'use strict'

const FormError = use('App/Exceptions/FormError')
const Logger = use('Logger')

module.exports = () => ({
  requiresController: false,
  requiresAuthUser: true,
  requiresRequest: true,
  requiresReview: false,
  requiresType: false,
  caller
})

async function caller ({ request, payload, authUser }) {
  try {
    await request.editLogs().create({
      edit_reason: payload.edit_reason,
      author_id: authUser.id
    })
  } catch ({ message }) {
    Logger.error(`[DEBUG] [ERRO] Ao tentar ATUALIZAR uma requisição (CREATE_UPDATE_LOG): ${message}`)
    throw new FormError('Houve um erro ao tentar atualizar este requerimento.', 500)
  }
}
