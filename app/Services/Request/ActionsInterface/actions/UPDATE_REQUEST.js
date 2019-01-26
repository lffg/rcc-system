'use strict'

/**
 * Action usada para:
 *   - Atualizar o requerimento;
 *   - Definir propriedades computadas após a atualização do requerimento.
 */

const getComputedRequestProps = require('../ext/getComputedRequestProps')

const htmlifyLineBreaks = use('App/Helpers/htmlify-line-breaks')
const sanitize = use('App/Helpers/sanitize')

module.exports = () => ({
  requiresTransaction: true,
  requiresController: false,
  requiresAuthUser: false,
  requiresRequest: true,
  requiresReview: false,
  requiresType: false,
  caller
})

async function caller({ transaction, request, payload }) {
  let data = {}

  for (const [key, { name }] of allowedFields.entries()) {
    if (payload[name] === null || typeof payload[name] === 'undefined') {
      delete payload[name]
    }

    // Transforma quebra de linhas em <br>:
    if (['reason', 'notes', 'price'].includes(name)) {
      payload[name] = !payload[name] ? null : htmlifyLineBreaks(payload[name])
    }

    // XSS-Clean:
    payload[name] = !payload[name] ? payload[name] : sanitize(payload[name])

    data = Object.assign(data, {
      [key]: payload[name]
    })
  }

  // Atualizar o requerimento, definindo também os dados computados:
  request.merge({ ...data, last_edit: new Date() })
  await request.save(transaction)

  const computedProps = await getComputedRequestProps(request, transaction)
  request.merge(computedProps)
  await request.save(transaction)

  // TODO ::
  // if (request.crh_state !== 'PENDING')
  // execute_action_by_system('REVIEW', request.crh_state)
}

const allowedFields = new Map([
  ['before_position_id', { name: 'before_position_id' }],
  ['after_position_id', { name: 'after_position_id' }],
  ['tag', { name: 'tag' }],
  ['price', { name: 'price' }],
  ['absence_until', { name: 'absence_until' }],
  ['banned_until', { name: 'banned_until' }],
  ['bonuses', { name: 'bonuses' }],
  ['reason', { name: 'reason' }],
  ['permission', { name: 'permission' }],
  ['notes', { name: 'notes' }],
  ['asked_by', { name: 'asked_by' }],
  ['extra_user_1', { name: 'extra_user_1' }],
  ['extra_user_2', { name: 'extra_user_2' }],
  ['extra_user_3', { name: 'extra_user_3' }],
  ['extra_user_4', { name: 'extra_user_4' }]
])
