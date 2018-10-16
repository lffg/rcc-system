'use strict'

class UserGroup {
  register (Model) {
    /**
     * Returns the groups that a user is a member of.
     *
     * @return  {array}
     */
    Model.prototype.getGroups = async function (getIds = false) {
      const groups = []

      const user = await Model.query()
        .where({ id: this.id })
        .select('id')
        .with('groups', (builder) => builder.select('id', 'alias'))
        .first()
        .then((user) => user.toJSON())

      for (let { id, alias } of user.groups) {
        if (getIds) {
          if (groups.includes(id)) continue
          groups.push(id)
          continue
        }

        if (groups.includes(alias.toUpperCase())) continue
        groups.push(alias.toUpperCase())
      }

      return groups
    }

    /**
     * Returns the groups that the user is moderator.
     *
     * @return {array}
     */
    Model.prototype.getModerationGroups = async function () {
      const groups = await Model.query()
        .where({ id: this.id })
        .select('id')
        .with('groups', (builder) => builder.select('id', 'alias').wherePivot('is_moderator', true))
        .first()
        .then((user) => user.toJSON().groups)

      return groups.map(({ id, alias }) => ({ id, alias }))
    }

    /**
     * Returns true if the user is part of the group.
     *
     * @param  {string|number} group
     * @return {boolean}
     */
    Model.prototype.hasGroup = async function (group, getById = false) {
      if (getById && typeof group === 'string' && !isNaN(parseInt(group))) {
        group = parseInt(group)
      }

      const groups = await this.getGroups(getById)

      if (getById) return groups.includes(group)
      return groups.includes(group.toUpperCase())
    }

    /**
     * Returns true if the user is a moderator of the group.
     *
     * @param  {string|number} group
     * @return {boolean}
     */
    Model.prototype.isModerator = async function (group, getById = false) {
      if (getById && typeof group === 'string' && !isNaN(parseInt(group))) {
        group = parseInt(group)
      }

      let groups = await this.getModerationGroups()

      if (getById) return groups.map(({ id }) => id).includes(group)
      return groups.map(({ alias }) => alias).includes(group.toUpperCase())
    }
  }
}

module.exports = UserGroup
