/**
 * Action usada para:
 *    - Especialização em Requerimento :: SPEC_REF_REQUEST
 */

const Position = use('App/Models/Position')
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
  const position = await Position.findByOrFail('alias', 'REC')

  const user = await User.findOrFail(request.receiver_id)
  user.state = 'RETIRED'
  user.absence_until = null
  user.banned_until = null
  user.temporary_bonuses = 0
  user.effective_bonuses = 0
  user.promoter_id = null
  user.position_id = position.id
  user.tag = null
  user.tag_type = 'NORMAL'
  user.change_position_date = new Date()
  await user.save(transaction)
}
