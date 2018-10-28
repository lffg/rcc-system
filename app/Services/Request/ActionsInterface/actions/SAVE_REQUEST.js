'use strict'

const FormError = use('App/Exceptions/FormError')
const Request = use('App/Models/Request')
const Route = use('Route')

module.exports = () => ({
  requiresController: false,
  requiresReview: false,
  requiresType: false,
  caller
})

async function caller ({ payload }) {
  let data = {}

  for (const [key, { name, required = false }] of requiredFields.entries()) {
    if (payload[name] === null || typeof payload[name] === 'undefined') {
      delete payload[name]
    }

    if (required && !payload[name]) {
      throw new FormError(`Erro ao criar a requisição: '${name}' está faltando.`, 400)
    }

    data = Object.assign(data, { [key]: payload[name] })
  }

  try {
    const request = new Request()
    request.merge(data)
    await request.save()
  } catch ({ message }) {
    throw new FormError('Houve um erro ao tentar criar este requerimento.', 500, Route.url('requests.create'))
  }
}

const requiredFields = new Map([
  ['controller_id',      { name: 'controller_id', required: true }],
  ['type_id',            { name: 'type_id', required: true }],
  ['is_reviewable',      { name: 'is_reviewable' }],
  ['crh_state',          { name: 'crh_state' }],
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
