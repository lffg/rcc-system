const Database = use('Database')

class UserGroup {
  register(Model) {
    /**
     * ---------------------------------------------------------------------
     * Métodos da instância:
     * ---------------------------------------------------------------------
     */

    /**
     * Retorna os grupos do usuário da instância.
     *
     * @param  {string|boolean} aliases
     * @param  {boolean} getModField
     * @return {Promise<{ id?: number, alias?: string, is_moderador?: boolean }[]|number[]|string[]>}
     */
    Model.prototype.getGroups = async function(
      aliases = false,
      getModField = false
    ) {
      const groups = await Database.distinct(
        (aliases === 'BOTH'
          ? ['G.id', 'G.alias']
          : aliases
          ? ['G.alias']
          : ['G.id']
        ).concat(getModField ? ['PGU.is_moderator'] : [])
      )
        .from('users as U')
        .innerJoin('pivot_group_user as PGU', 'PGU.user_id', '=', 'U.id')
        .innerJoin('groups as G', 'G.id', '=', 'PGU.group_id')
        .where('U.id', this.id)

      if (aliases === 'BOTH' || getModField) {
        return groups
      }

      return groups.map(({ id = null, alias = null }) =>
        aliases && !!alias ? alias : id
      )
    }

    /**
     * Retorna os grupos de que o usuário é moderador.
     *
     * @param  {string|boolean} aliases
     * @return {Promise<{ id?: number, alias?: string }[]|number[]|string[]>}
     */
    Model.prototype.getModerationGroups = async function(aliases = false) {
      const groups = (await this.getGroups(aliases, true))
        .filter(({ is_moderator: isMod }) => !!isMod)
        .map(({ id, alias }) => ({ id, alias }))

      if (aliases === 'BOTH') {
        return groups
      }

      return groups.map(({ id = null, alias = null }) =>
        aliases && !!alias ? alias : id
      )
    }

    /**
     * Verifica se um usuário faz parte do grupo.
     *
     * @param  {string|number} group
     * @param  {boolean} getByAlias
     * @return {Promise<boolean>}
     */
    Model.prototype.hasGroup = async function(group, getByAlias = false) {
      if (!getByAlias && typeof group === 'string' && !isNaN(parseInt(group))) {
        group = parseInt(group)
      }

      const groups = await this.getGroups(getByAlias)
      return groups.includes(getByAlias ? group.toUpperCase() : group)
    }

    /**
     * Verifica se um usuário é moderador de um grupo.
     *
     * @param  {string|number} group
     * @param  {boolean} getByAlias
     * @return {Promise<boolean>}
     */
    Model.prototype.isModerator = async function(group, getByAlias = false) {
      if (!getByAlias && typeof group === 'string' && !isNaN(parseInt(group))) {
        group = parseInt(group)
      }

      const groups = await this.getModerationGroups(getByAlias)
      return groups.includes(getByAlias ? group.toUpperCase() : group)
    }
  }
}

module.exports = UserGroup
