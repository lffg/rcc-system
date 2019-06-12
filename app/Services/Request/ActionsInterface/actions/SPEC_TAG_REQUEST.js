/**
 * Action usada para:
 *    - Especialização em Requerimento :: SPEC_TAG_REQUEST
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

async function caller({ transaction, request }, ActionError) {
  try {
    const user = await User.findOrFail(request.receiver_id);
    user.tag = request.tag;
    await user.save(transaction);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new ActionError(
        `Aprovação cancelada: A tag [${request.tag}] já está em uso.`
      );
    }

    throw error;
  }
}
