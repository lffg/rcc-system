/**
 * Action usada para:
 *    - Especialização em Requerimento :: SPEC_REJOIN
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
  user.state = 'ACTIVE'
  user.promoter_id = request.author_id
  user.position_id = request.after_position_id
  user.tag_type = 'NORMAL'
  user.change_position_date = new Date()
  await user.save(transaction)
}
