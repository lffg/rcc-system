'use strict'

const shortid = require('shortid')
const crypto = require('crypto')

const RequestHook = exports = module.exports = {}

RequestHook.createIntegrityToken = (requestInstance) => {
  const token = crypto
    .createHash('sha1')
    .update(`${shortid.generate()}${Date.now().toString(16)}`)
    .digest('hex')

  requestInstance.integrity_token = token
}
