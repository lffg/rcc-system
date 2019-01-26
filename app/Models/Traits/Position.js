'use strict'

const PositionGroup = use('App/Models/PositionGroup')
const User = use('App/Models/User')

class Position {
  register(Model) {
    /**
     * ---------------------------------------------------------------------
     * Métodos estáticos:
     * ---------------------------------------------------------------------
     */

    /**
     * Retorna uma lista de posições detalhada.
     *
     * @param  {object} config
     * @param  {number} groupId
     * @return {Promise<object|object[]>}
     */
    Model.getFullPositionsList = async (
      { prev = true, next = true, equivalence = true } = {},
      groupId = null
    ) => {
      const builder = (builder) => builder.select('id', 'name', 'color')

      const query = PositionGroup.query().select(
        'id',
        'name',
        'alias',
        'description'
      )

      if (groupId) query.andWhere({ id: groupId })

      query.with('positions')
      if (prev) query.with('positions.prev', builder)
      if (next) query.with('positions.next', builder)
      if (equivalence) query.with('positions.equivalence', builder)

      return query.fetch().then((positions) => positions.toJSON())
    }

    /**
     * Retorna uma lista de posições para um dado grupo.
     *
     * @param  {any} groupId
     * @return {Promise<object|object[]>}
     */
    Model.getPositions = async (groupId = null, filter = {}) => {
      const query = PositionGroup.query()
        .select('id', 'name', 'alias')
        .with('positions', (builder) =>
          builder.select('id', 'group_id', 'name').where(filter)
        )

      if (groupId) query.andWhere({ id: groupId })

      const data = await query[!groupId ? 'fetch' : 'firstOrFail']().then(
        (groups) => groups.toJSON()
      )

      return Array.isArray(data) ? data : [data]
    }

    /**
     * Retorna as informações de posição para um determinado usuário.
     *
     * @param  {object} userId
     * @return {Promise<object>}
     */
    Model.getUserPositionInfo = async (userId) => {
      const {
        id,
        username,
        position: {
          id: positionId,
          name: positionName,
          group: { id: groupId, alias, name: groupName }
        }
      } = await User.query()
        .select('id', 'position_id', 'username')
        .where({ id: userId })
        .with('position')
        .with('position.group', (builder) =>
          builder.select('id', 'name', 'alias')
        )
        .firstOrFail()
        .then((user) => user.toJSON())

      return {
        user: { id, username },
        position: { id: positionId, name: positionName },
        group: { id: groupId, name: groupName, alias }
      }
    }

    /**
     * ---------------------------------------------------------------------
     * Macros de queries:
     * ---------------------------------------------------------------------
     */

    /**
     * Macro de query para carregar relações de posições anterior,
     * próxima, equivalente; alem do grupo de posição.
     *
     * @return {object}
     */
    Model.queryMacro('getNear', function() {
      this.select('*')
        .with('group', (builder) => builder.select('id', 'name', 'alias'))
        .with('prev', (builder) => builder.select('id', 'name'))
        .with('next', (builder) => builder.select('id', 'name'))
        .with('equivalence', (builder) => builder.select('id', 'name'))

      return this
    })
  }
}

module.exports = Position
