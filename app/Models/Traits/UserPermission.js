'use strict'

const Database = use('Database')

class UserPermission {
  register (Model) {
    /**
     * ---------------------------------------------------------------------
     * Métodos da instância:
     * ---------------------------------------------------------------------
     */

    /**
     * Retorna as permissões do usuário da instância.
     *
     * @param  {boolean|string} aliases
     * @return {Promise<{ id: number, alias: string }[]|number[]|string[]>}
     */
    Model.prototype.getPermissions = async function (aliases = false) {
      const permissions = await Database
        .distinct(aliases === 'BOTH' ? ['P.id', 'P.alias'] : (aliases ? 'P.alias' : 'P.id'))
        .from('users as U')
        .innerJoin('pivot_group_user as PGU', 'PGU.user_id', '=', 'U.id')
        .innerJoin('groups as G', 'G.id', '=', 'PGU.group_id')
        .innerJoin('pivot_group_permission as PGP', 'PGP.group_id', '=', 'G.id')
        .innerJoin('permissions as P', 'P.id', '=', 'PGP.permission_id')
        .where('U.id', this.id)

      if (aliases === 'BOTH') {
        return permissions
      }

      return permissions.map(({ id = null, alias = null }) => (
        (aliases && !!alias) ? alias : id
      ))
    }

    /**
     * Verifica se um usuário faz parte da permissão.
     *
     * @param  {string|number} permission
     * @param  {boolean} getByAlias
     * @return {Promise<boolean>}
     */
    Model.prototype.hasPermission = async function (permission, getByAlias = false) {
      if (!getByAlias && typeof permission === 'string' && !isNaN(parseInt(permission))) {
        permission = parseInt(permission)
      }

      const permissions = await this.getPermissions(getByAlias)
      return permissions.includes(getByAlias ? permission.toUpperCase() : permission)
    }
  }
}

module.exports = UserPermission
