/**
 * Action usada para:
 *    - Especialização em Requerimento :: SPEC_CHANGE_ACC
 */

const { validate } = use('App/Services/General/ValidateUser')
const ChangeUsernameLog = use('App/Models/ChangeUsernameLog')
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

async function caller({ transaction, request }, ActionError) {
  const { status, error } = await validate(request.extra_user_1)
  if (!status && error) throw new ActionError(`Aprovação cancelada: ${error}`)

  const user = await User.findOrFail(request.receiver_id)

  const log = new ChangeUsernameLog()
  log.old_username = user.username
  log.new_username = request.extra_user_1
  log.request_id = request.id
  await log.save(transaction)

  user.username = request.extra_user_1
  await user.save(transaction)
}
