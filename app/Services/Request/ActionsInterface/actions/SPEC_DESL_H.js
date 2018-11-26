'use strict'

/**
 * Action usada para:
 *    - Especialização em Requerimento :: SPEC_DESL_H
 */

const User = use('App/Models/User')

module.exports = () => ({
  requiresTransaction: true,
  requiresController: false,
  requiresAuthUser: true,
  requiresRequest: true,
  requiresReview: false,
  requiresType: false,
  caller
})

async function caller ({ transaction, authUser, request, payload }) {

}
