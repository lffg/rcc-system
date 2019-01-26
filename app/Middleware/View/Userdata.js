'use strict'

const { merge } = require('lodash')

const User = use('App/Models/User')

class Userdata {
  async handle({ view, auth }, next) {
    try {
      await auth.check()
    } catch (error) {
      view.share({ $userdata: { logged_in: false } })

      return next()
    }

    const userdata = await User.query()
      .where({ id: auth.user.id })
      .with('groups')
      .with('position')
      .withCount('notifications')
      .first()

    view.share({
      $userdata: merge(userdata.toJSON(), { logged_in: true })
    })

    return next()
  }
}

module.exports = Userdata
