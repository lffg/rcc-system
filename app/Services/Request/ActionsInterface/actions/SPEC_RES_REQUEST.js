/**
 * Action usada para:
 *    - Especialização em Requerimento :: SPEC_RES_REQUEST
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
  user.absence_until = request.absence_until
  await user.save(transaction)
}
