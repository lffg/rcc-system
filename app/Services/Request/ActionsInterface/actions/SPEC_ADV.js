'use strict'

/**
 * Action usada para:
 *    - Especialização em Requerimento :: SPEC_ADV
 */

const moment = require('moment')
const UserWarning = use('App/Models/UserWarning')

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
  const warn = new UserWarning()
  warn.until = moment(Date.now()).add(1, 'months').format('YYYY-MM-DD')
  warn.user_id = request.receiver_id
  warn.request_id = request.id
  await warn.save(transaction)
}
