'use strict'

const { promisify } = require('util')
const shortid = require('shortid')
const { join } = require('path')
const crypto = require('crypto')
const fs = require('fs')

const readFile = promisify(fs.readFile)

const Request = use('App/Models/Request')
const Database = use('Database')
const View = use('View')

const RequestHook = exports = module.exports = {}

RequestHook.createIntegrityToken = async (requestInstance) => {
  const token = crypto
    .createHash('sha1')
    .update(`${shortid.generate()}${Date.now().toString(16)}`)
    .digest('hex')

  requestInstance.integrity_token = token
}

RequestHook.setComputedFields = async (requestInstance) => {
  const request = await Database
    .select([
      'T.alias as type_alias',
      'R.username as receiver',
      'A.username as author',
      'Bp.name as before_position',
      'Ap.name as after_position',
      'req.*'
    ])
    .from('requests as req')
    .innerJoin('request_types as T', 'T.id', '=', 'req.type_id')
    .innerJoin('users as R', 'R.id', '=', 'req.receiver_id')
    .innerJoin('users as A', 'A.id', '=', 'req.author_id')
    .leftJoin('positions as Bp', 'Bp.id', '=', 'req.before_position_id')
    .leftJoin('positions as Ap', 'Ap.id', '=', 'req.after_position_id')
    .where('req.id', requestInstance.id)
    .first()

  const template = await readFile(join(__dirname, 'data', 'requests-computed.edge'), 'utf8')

  const computedBody = View.renderString(template, { request, type: 'BODY' })
  const computedTitle = View.renderString(template, { request, type: 'TITLE' })
  const computedTemplate = View.renderString(template, { request, type: 'ENTITY_TEMPLATE' })

  await Request.query()
    .update({
      computed_body: computedBody.trim() || 'Tipo não definido.',
      computed_title: computedTitle.trim() || 'Corpo não definido.',
      computed_template: computedTemplate.trim() || 'Dados indisponíveis para este requerimento.'
    })
    .where({ id: requestInstance.id })
}
