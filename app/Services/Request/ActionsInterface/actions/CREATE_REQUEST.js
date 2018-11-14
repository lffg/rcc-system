'use strict'

const htmlifyLineBreaks = use('App/Helpers/htmlify-line-breaks')
const FormError = use('App/Exceptions/FormError')
const sanitize = use('App/Helpers/sanitize')
const Request = use('App/Models/Request')
const Logger = use('Logger')
const Route = use('Route')

module.exports = () => ({
  requiresController: false,
  requiresAuthUser: false,
  requiresRequest: false,
  requiresReview: false,
  requiresType: false,
  caller
})

async function caller ({ payload, systemAction = false }) {
  let data = {}

  for (const [key, { name, allowUserOption = true, required = false }] of requiredFields.entries()) {
    if (
      (!allowUserOption && systemAction) ||
      (payload[name] === null) ||
      (typeof payload[name] === 'undefined')
    ) {
      delete payload[name]
    }

    if (required && !payload[name]) {
      throw new FormError(`Erro ao criar a requisição: '${name}' está faltando.`, 400)
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

  if ([data.is_crh, data.crh_state].every((field) => typeof field === 'undefined')) {
    data.crh_state = 'PENDING'
  }

  try {
    await Request.create(data)
  } catch ({ message }) {
    Logger.error(`[DEBUG] [ERRO] Ao tentar CRIAR uma requisição: ${message}`)
    throw new FormError('Houve um erro ao tentar criar o requerimento.', 500, Route.url('requests.create'))
  }
}

const requiredFields = new Map([
  ['controller_id',      { name: 'controller_id', required: true }],
  ['type_id',            { name: 'type_id', required: true }],
  ['is_crh',             { name: 'is_crh', allowUserOption: false }],
  ['crh_state',          { name: 'crh_state', allowUserOption: false }],
  ['author_id',          { name: 'author_id', required: true }],
  ['receiver_id',        { name: 'receiver_id', required: true }],
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
