'use strict'

const RequestController = use('App/Models/RequestController')
const { getPositions } = use('App/Models/Position')
const User = use('App/Models/User')

class RequestType {
  register (Model) {
    /**
     * ---------------------------------------------------------------------
     * Métodos estáticos (`RequestType`).
     * ---------------------------------------------------------------------
     */

    /**
     * Retorna todas as informações de um tipo pelo ID.
     * Através de uma opção, é possível também retornar as posições
     * permitidas para este determinado tipo.
     *
     * @static
     * @param  {any} id
     * @param  {boolean} getPos (getPositions)
     * @return {Promise<object>}
     */
    Model.getInfoFor = async (id = null, getPos = false) => {
      const filter = { is_available_to_crh: true }

      const type = await Model.query()
        .select('*')
        .where({ id })
        .firstOrFail()

      const data = type.toJSON()

      if (getPos && (type.field_before_position !== 'HIDE' || type.field_after_position !== 'HIDE')) {
        let positions = null

        if (data.before_position_group_id === data.after_position_group_id) {
          positions = await getPositions(data.before_position_group_id, filter)
        }

        data.positions = {
          before: positions || await getPositions(data.before_position_group_id, filter),
          after: positions || await getPositions(data.after_position_group_id, filter)
        }
      }

      return data
    }

    /**
     * Retorna todos os tipos para um determinado controller (pelo ID
     * do controller).
     *
     * @static
     * @param  {any} id
     * @return {Promise<object>}
     */
    Model.findTypesFor = async (id = null) => {
      const controller = await RequestController.query()
        .select('id')
        .where({ id })
        .with('types', (builder) => builder.select('id', 'controller_id', 'name', 'color', 'icon'))
        .firstOrFail()

      return controller.toJSON().types
    }

    /**
     * ---------------------------------------------------------------------
     * Métodos da instância (`RequestType`).
     * ---------------------------------------------------------------------
     */

    /**
     * Retorna todas as ações para um determinado tipo, através da
     * sua instância.
     *
     * @return {Promise<object[]>}
     */
    Model.prototype.getActions = async function () {
      const actions = await this.actions()
        .fetch()
        .then((actions) => actions.toJSON())

      return actions
        .map(({ id, alias, execute_on: on, name, description }) => ({ id, alias, on, name, description }))
    }

    /**
     * Retorna `true` se um tipo for permitido para um determinado
     * usuário.
     *
     * @param  {object<User Model Instance>} userInstance
     * @return {Promise<boolean>}
     */
    Model.prototype.isValidUser = async function (userInstance) {
      if (!(userInstance instanceof User)) {
        throw new TypeError('Instância de usuário inválida para `RequestType.isValidUser`')
      }

      if (!this.strict_to_position_group) return true

      try {
        const position = await userInstance.position().fetch()

        if (position.group_id !== this.strict_to_position_group) {
          return false
        }
      } catch (e) {
        return true
      }

      return true
    }

    /**
     * Valida os usuários para o tipo da instância.
     *
     * @param  {string[]} users
     * @return {Promise<{ status: boolean, code?: string, params?: string[] }>}
     */
    Model.prototype.validateUsers = async function (users) {
      if (!Array.isArray(users)) {
        throw new TypeError('`users` deve ser do tipo array em `RequestType.checkUsers`.')
      }

      if (!users.length) {
        return { status: false, code: 'NO_USERS' }
      }

      if (!this.allow_multiple_users && users.length > 1) {
        return { status: false, code: 'MORE_THAN_ONE_USER' }
      }

      if (!this.allow_unregistered_users) {
        for (const username of users) {
          const user = await User.findBy('username', username)

          if (!user) {
            return { status: false, code: 'NO_USER', params: [username] }
          }

          if (!await this.isValidUser(user)) {
            return { status: false, code: 'INVALID_POSITION', params: [username] }
          }
        }
      }

      return { status: true }
    }

    /**
     * Valida os campos para o tipo da instância.
     *
     * @param  {string[]} users
     * @return {Promise<{ status: boolean, code?: string, params?: string[] }>}
     */
    Model.prototype.validateFields = async function (data) {
      const dict = new Map([
        ['field_before_position', 'before_position_id'],
        ['field_after_position', 'after_position_id'],
        ['field_tag', 'tag'],
        ['field_price', 'price'],
        ['field_banned_days', 'banned_days'],
        ['field_bonuses', 'bonuses'],
        ['field_absence_days', 'absence_days'],
        ['field_reason', 'reason'],
        ['field_notes', 'notes'],
        ['field_permission', 'permission'],
        ['field_asked_by', 'asked_by']
      ])

      for (const [key, field] of dict.entries()) {
        if (!this[key]) continue

        if (this[key] === 'REQUIRED' && !data[field]) {
          return { status: false, code: 'MISSING_VALUES', params: [field] }
        }

        if (this[key] === 'HIDE' && !!data[field]) {
          return { status: false, code: 'FORBIDDEN_FIELDS', params: [field] }
        }
      }

      return { status: true }
    }
  }
}

module.exports = RequestType
