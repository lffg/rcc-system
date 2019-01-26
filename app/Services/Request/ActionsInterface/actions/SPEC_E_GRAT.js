'use strict'

/**
 * Action usada para:
 *    - Especialização em Requerimento :: SPEC_E_GRAT
 */

const User = use('App/Models/User')

module.exports = () => ({
  requiresTransaction: true,
  requiresController: false,
  requiresAuthUser: false,
  requiresRequest: true,
  requiresReview: false,
  requiresType: false,
  caller
})

async function caller({ transaction, request }) {
  const user = await User.findOrFail(request.receiver_id)
  user.effective_bonuses =
    parseInt(user.effective_bonuses, 10) + parseInt(request.bonuses, 10)
  await user.save(transaction)
}
