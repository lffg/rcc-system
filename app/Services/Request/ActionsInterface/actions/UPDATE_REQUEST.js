'use strict'

const htmlifyLineBreaks = use('App/Helpers/htmlify-line-breaks')
const FormError = use('App/Exceptions/FormError')
const sanitize = use('App/Helpers/sanitize')
const Logger = use('Logger')

module.exports = () => ({
  requiresController: false,
  requiresAuthUser: false,
  requiresRequest: true,
  requiresReview: false,
  requiresType: false,
  caller
})

async function caller ({ request, payload }) {
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

  try {
    request.merge(data)
    await request.save()

    // TODO ::
    // if (request.crh_state !== 'PENDING')
    // execute_action_by_system('REVIEW', request.crh_state)
  } catch ({ message }) {
    Logger.error(`[DEBUG] [ERRO] Ao tentar ATUALIZAR uma requisição (UPDATE_REQUEST): ${message}`)
    throw new FormError('Houve um erro ao tentar atualizar este requerimento.', 500)
  }
}

const allowedFields = new Map([
  ['before_position_id', { name: 'before_position_id' }],
  ['after_position_id',  { name: 'after_position_id' }],
  ['tag',                { name: 'tag' }],
  ['price',              { name: 'price' }],
  ['absence_days',       { name: 'absence_days' }],
  ['banned_days',        { name: 'banned_days' }],
  ['bonuses',            { name: 'bonuses' }],
  ['reason',             { name: 'reason' }],
  ['permission',         { name: 'permission' }],
  ['notes',              { name: 'notes' }],
  ['asked_by',           { name: 'asked_by' }]
])
