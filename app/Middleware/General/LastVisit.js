const User = use('App/Models/User')

class LastVisit {
  async handle({ auth }, next) {
    try {
      await auth.check()
    } catch (e) {
      return next()
    }

    const user = await User.findOrFail(auth.user.id)

    user.last_visit = Date.now()
    await user.save()

    return next()
  }
}

module.exports = LastVisit
