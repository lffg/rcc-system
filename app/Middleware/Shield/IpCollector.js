'use strict'

const User = use('App/Models/User')

class IpCollector {
  async handle ({ request, session, auth }, next) {
    try {
      await auth.check()
    } catch (e) {
      return next()
    }

    if (session.get('current_ip') === request.ip()) {
      return next()
    }

    session.put('current_ip', request.ip())

    const user = await User.findOrFail(auth.user.id)
    const ips = await user.ips().fetch()
      .then((ips) => ips.toJSON())
      .then((ips) => ips.map((ip) => ip.ip))

    if (ips.includes(request.ip())) return next()

    await user.ips().create({ ip: request.ip() })
    return next()
  }
}

module.exports = IpCollector
