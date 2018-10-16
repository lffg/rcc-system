'use strict'

const User = use('App/Models/User')

class HasGroup {
  async handle ({ view, auth }, next) {
    let groups = []
    let moderationGroups = []

    try {
      await auth.check()

      const user = await User.findOrFail(auth.user.id)
      groups = await user.getGroups()
      moderationGroups = await user.getModerationGroups()
    } catch (e) {}

    this._createGlobal(view, groups, moderationGroups)

    return next()
  }

  _createGlobal (view, groups = [], modGroups = []) {
    view.share({
      hasGroup: (alias) => groups.includes(alias.toUpperCase()),
      isModerator: (group, getById) => {
        if (getById && typeof group === 'string' && !isNaN(parseInt(group))) {
          group = parseInt(group)
        }

        if (getById) return modGroups.map(({ id }) => id).includes(group)
        return modGroups.map(({ alias }) => alias).includes(group.toUpperCase())
      }
    })
  }
}

module.exports = HasGroup
