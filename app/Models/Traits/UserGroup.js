'use strict'

class UserGroup {
  register (Model) {
    /**
     * ---------------------------------------------------------------------
     * Métodos da instância:
     * ---------------------------------------------------------------------
     */

    /**
     * Retorna os grupos de que um usuário faz parte.
     *
     * @param  {boolean} getIds
     * @return {Promise<object[]>}
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
     * Retorna os grupos de que o usuário é moderador.
     *
     * @return {Promise<object[]>}
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
     * Retorna `true` se um usuário faz parte de um determinado grupo.
     *
     * @param  {string|number} group
     * @param  {boolean} getById
     * @return {Promise<boolean>}
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
     * Retorna `true` se um usuário é moderador de um grupo.
     *
     * @param  {string|number} group
     * @param  {boolean} getById
     * @return {Promise<boolean>}
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
