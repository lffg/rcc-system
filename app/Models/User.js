'use strict'

const moment = require('moment')

const Model = use('Model')

class User extends Model {
  /**
   * Método de boot (inicialização).
   *
   * @static
   * @return {void}
   */
  static boot() {
    super.boot()

    this.addHook('beforeSave', 'UserHook.hashPassword')
    this.addHook('afterCreate', 'UserHook.addUserToPosition')
    this.addHook('afterCreate', 'UserHook.addToUsersGroup')
    this.addHook('afterCreate', 'UserHook.createAccountRegisterEvent')
    this.addTrait('UserGroup')
    this.addTrait('UserSalary')
    this.addTrait('UserPermission')
  }

  /**
   * Getter que define as propriedades computadas.
   *
   * @static
   * @return {string[]}
   */
  static get computed() {
    return ['allowed', 'disallowReason', 'isBanned']
  }

  /**
   * Cria a propriedade computada "allowed".
   *
   * @param  {string} User.state
   * @param  {number} User.banned_until
   * @return {boolean}
   */
  getAllowed({ state }) {
    const isAllowedState = ['ACTIVE', 'RETIRED', 'VETERAN'].includes(state)
    return isAllowedState && !this.getIsBanned(...arguments)
  }

  /**
   * Cria a propriedade computada "disallowReason".
   *
   * @param  {string} User.username
   * @param  {string} User.state
   * @param  {number} User.banned_until
   * @return {string|boolean}
   */
  getDisallowReason({ username, state, banned_until: bannedUntil = 0 }) {
    if (this.getAllowed(...arguments)) return false

    if (this.getIsBanned(...arguments)) {
      return `O usuário ${username} está exonerado até o dia ${moment(
        bannedUntil
      ).format('DD/MM/YYYY')}.`
    }

    return {
      ACTIVE: `O usuário ${username} está ativo.`,
      RETIRED: `O usuário ${username} está reformado.`,
      VETERAN: `O usuário ${username} é veterano.`,
      INACTIVE: `O usuário ${username} está inativo.`
    }[state]
  }

  /**
   * Cria a propriedade computada "isBanned".
   *
   * @param  {string} User.banned_until
   * @return {boolean}
   */
  getIsBanned({ banned_until: bannedUntil }) {
    if (!bannedUntil) return false
    return !moment(bannedUntil).isSameOrBefore(Date.now(), 'day')
  }

  /**
   * Cria a propriedade computada "bannedUntilDate".
   *
   * @param  {number} User.banned_until
   * @return {string|boolean}
   */
  getBannedUntilDate({ banned_until: bannedUntil }) {
    if (Date.now() > bannedUntil) return false

    return moment(bannedUntil).format('DD/MM/YYYY [às] HH:mm')
  }

  /**
   * Cria a propriedade computada "tag".
   *
   * @param  {string} tag
   * @return {string}
   */
  getTag(tag) {
    return tag || '___'
  }

  /**
   * Cria a propriedade computada "gender".
   *
   * @param  {string} gender
   * @return {string}
   */
  getGender(gender) {
    switch (gender) {
      case 'M':
        return 'Masculino'
      case 'F':
        return 'Feminino'
      default:
        return 'Não Especificado'
    }
  }

  /**
   * Cria a propriedade computada "location".
   *
   * @param  {string} location
   * @return {string}
   */
  getLocation(location) {
    switch (location) {
      case 'BR':
        return 'Brasil'
      case 'PT':
        return 'Portugal'
      case 'AO':
        return 'Angola'
      case 'MZ':
        return 'Moçambique'
      case 'OTHER':
        return 'Outro'
      default:
        return 'Não Especificado'
    }
  }

  /**
   * ---------------------------------------------------------------------
   * Relações
   * ---------------------------------------------------------------------
   *
   * Os métodos definidos abaixo são usados para estabelecer relações
   * entre outros modelos (models).
   *
   */

  groups() {
    return this.belongsToMany('App/Models/Group').pivotTable('pivot_group_user')
  }

  promoter() {
    return this.belongsTo('App/Models/User', 'promoter_id')
  }

  tickets() {
    return this.hasMany('App/Models/ErrorTicket', 'id', 'author_id')
  }

  timeline() {
    return this.hasMany('App/Models/CrhRequest', 'id', 'affected_id')
  }

  position() {
    return this.belongsTo('App/Models/Position')
  }

  posts() {
    return this.hasMany('App/Models/Post')
  }

  userSearches() {
    return this.hasMany('App/Models/LastUserSearch')
  }

  ips() {
    return this.hasMany('App/Models/Ip')
  }

  notifications() {
    return this.hasMany('App/Models/Notification')
  }

  warnings() {
    return this.hasMany('App/Models/UserWarning')
  }

  logs() {
    return this.hasMany('App/Models/Log')
  }

  tokens() {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
