/**
 * Action usada para:
 *    - Especialização em Requerimento :: SPEC_T_GRAT
 */

const User = use('App/Models/User');

module.exports = () => ({
  requiresTransaction: true,
  requiresController: false,
  requiresAuthUser: false,
  requiresRequest: true,
  requiresReview: false,
  requiresType: false,
  caller
});

async function caller({ transaction, request }) {
  const user = await User.findOrFail(request.receiver_id);
  user.temporary_bonuses =
    parseInt(user.temporary_bonuses) + parseInt(request.bonuses);
  await user.save(transaction);
}
