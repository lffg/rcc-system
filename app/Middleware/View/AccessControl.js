class HasGroup {
  async handle({ view, auth }, next) {
    let groups = []
    let moderationGroups = []
    let permissions = []

    try {
      await auth.check()

      groups = await auth.user.getGroups('BOTH')
      moderationGroups = await auth.user.getModerationGroups('BOTH')
      permissions = await auth.user.getPermissions('BOTH')
    } catch (e) {
      // Pass.
    }

    this.createGlobals(view, groups, moderationGroups, permissions)
    return next()
  }

  createGlobals(view, groups = [], modGroups = [], permissions = []) {
    view.share({
      /**
       * Verifica se o usuário logado possui o grupo.
       *
       * @param  {number|string} group
       * @param  {boolean} getByAlias
       * @return {boolean}
       */
      hasGroup(group, getByAlias = false) {
        if (
          !getByAlias &&
          typeof group === 'string' &&
          !isNaN(parseInt(group))
        ) {
          group = parseInt(group)
        }

        return groups
          .map(({ id, alias }) => (getByAlias ? alias : id))
          .includes(typeof group === 'number' ? group : group.toUpperCase())
      },

      /**
       * Verifica se o usuário logado é moderador do grupo.
       *
       * @param  {number|string} group
       * @param  {boolean} getByAlias
       * @return {boolean}
       */
      isModerator: (group, getByAlias = false) => {
        if (
          !getByAlias &&
          typeof group === 'string' &&
          !isNaN(parseInt(group))
        ) {
          group = parseInt(group)
        }

        return modGroups
          .map(({ id, alias }) => (getByAlias ? alias : id))
          .includes(typeof group === 'number' ? group : group.toUpperCase())
      },

      /**
       * Verifica se o usuário logado tem a permissão.
       *
       * @param  {number|string} permission
       * @param  {boolean} getByAlias
       * @return {boolean}
       */
      hasPermission(permission, getByAlias = true) {
        if (
          !getByAlias &&
          typeof permission === 'string' &&
          !isNaN(parseInt(permission))
        ) {
          permission = parseInt(permission)
        }

        return permissions
          .map(({ id, alias }) => (getByAlias ? alias : id))
          .includes(
            typeof permission === 'number'
              ? permission
              : permission.toUpperCase()
          )
      }
    })
  }
}

module.exports = HasGroup
