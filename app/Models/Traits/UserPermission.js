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
     * @param  {boolean} getAliases
     * @return {Promise<{ id: number, alias: string }[]>}
     */
    Model.prototype.getPermissions = async function (getAliases = false) {
      const permissions = await Database
        .distinct(!getAliases ? 'P.id' : 'P.alias')
        .from('users AS U')
        .innerJoin('pivot_group_user AS PGU', 'PGU.user_id', '=', 'U.id')
        .innerJoin('groups AS G', 'G.id', '=', 'PGU.group_id')
        .innerJoin('pivot_group_permission AS PGP', 'PGP.group_id', '=', 'G.id')
        .innerJoin('permissions AS P', 'P.id', '=', 'PGP.permission_id')
        .where('U.id', this.id)

      // Ao invés de retornar um objeto com ID ou alias, retorne um array:
      return permissions.map(({ id = null, alias = null }) => (
        !getAliases && !!id ? id : alias
      ))
    }

    /**
     * Verifica se um usuário faz parte da permissão.
     *
     * @param  {string|number} permission (alias ou id da permissão)
     * @param  {boolean} getById
     * @return {Promise<boolean>}
     */
    Model.prototype.hasPermission = async function (permission, getByAlias = false) {
      if (!getByAlias && typeof permission === 'string' && !isNaN(parseInt(permission))) {
        permission = parseInt(permission)
      }

      const permissions = await this.getPermissions()

      if (getByAlias) return permissions.map(({ alias }) => alias).includes(permission.toUpperCase())
      return permissions.map(({ id }) => id).includes(permission)
    }
  }
}

module.exports = UserPermission
