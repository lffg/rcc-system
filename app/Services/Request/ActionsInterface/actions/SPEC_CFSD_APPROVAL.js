'use strict'

/**
 * Action usada para:
 *    - Especialização em Requerimento :: SPEC_CFSD_APPROVAL
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

async function caller ({ transaction, request }) {
  const position = await Position.findByOrFail('alias', 'SLD')
  const user = await User.findOrFail(request.receiver_id)

  user.state = 'ACTIVE'
  user.position_id = position.id
  user.promoter_id = request.author_id
  user.tag_type = 'NORMAL'
  user.change_position_date = new Date()
  await user.save(transaction)
}
