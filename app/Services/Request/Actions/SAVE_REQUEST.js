'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions')
const Request = use('App/Models/Request')

const dict = new Map([
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

module.exports = async function SAVE_REQUEST (rawData) {
  let data = {}

  for (const [key, { name, required = false }] of dict.entries()) {
    if (required && !rawData[name]) {
      throw new HttpException(`Erro ao criar a requisição: '${name}' está faltando.`, 500)
    }

    data = Object.assign(data, { [key]: rawData[name] })
  }

  try {
    const request = new Request()
    request.merge(data)
    await request.save()
  } catch ({ message }) {
    throw new HttpException(`Erro ao criar a requisição: ${message}`, 500)
  }
}
