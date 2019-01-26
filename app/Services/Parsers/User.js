'use strict'

const { pick } = require('lodash')

class UserParser {
  static parse(data = {}) {
    const userdata = pick(data, [
      'effective_bonuses',
      'temporary_bonuses',
      'is_verified_email',
      'position_id',
      'username',
      'password',
      'email',
      'state'
    ])

    userdata.is_verified_email = userdata.is_verified_email === 'on'

    if (
      !userdata.password ||
      (typeof userdata.password === 'string' && userdata.password === '')
    ) {
      delete userdata.password
    }

    return userdata
  }
}

module.exports = UserParser
