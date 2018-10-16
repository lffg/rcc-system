'use strict'

const moment = require('moment')

const Model = use('Model')

class User extends Model {
  /**
   * Boot method
   *
   * @static
   * @return {void}
   */
  static boot () {
    super.boot()

    this.addHook('beforeSave', 'UserHook.hashPassword')
    this.addHook('afterCreate', 'UserHook.addUserToPosition')
    this.addHook('afterCreate', 'UserHook.addToUsersGroup')
    // this.addHook('afterCreate', 'UserHook.createAccountRegisterEvent')
    this.addTrait('UserGroup')
    this.addTrait('UserSalary')
  }

  /**
   * Getter that defines the computed properties.
   *
   * @static
   * @return {string[]}
   */
  static get computed () {
    return ['allowed', 'disallowReason', 'isBanned', 'bannedUntilDate']
  }

  /**
   * Creates the "allowed" computed property.
   *
   * @param  {string} User.state
   * @param  {number} User.banned_until
   * @return {boolean}
   */
  getAllowed ({ state, banned_until: bannedUntil = 0 }) {
    const isAllowedState = ['ACTIVE', 'RETIRED', 'VETERAN'].includes(state)
    const isBanned = Date.now() > bannedUntil

    return (isAllowedState && isBanned)
  }

  /**
   * Creates the "disallowReason" computed property.
   *
   * @param  {string} User.username
   * @param  {string} User.state
   * @param  {number} User.banned_until
   * @return {string|boolean}
   */
  getDisallowReason ({ username, state, banned_until: bannedUntil = 0 }) {
    if (this.getAllowed(...arguments)) return false

    if (Date.now() < bannedUntil) {
      return `O usuário ${username} está exonerado até o dia ${moment(bannedUntil).format('DD/MM/YYYY [às] HH:mm')}.`
    }

    return ({
      'ACTIVE'   : `O usuário ${username} está ativo.`,
      'RETIRED'  : `O usuário ${username} está reformado.`,
      'VETERAN'  : `O usuário ${username} é veterano.`,
      'INACTIVE' : `O usuário ${username} está inativo.`
    })[state]
  }

  /**
   * Creates the "isBanned" computed property.
   *
   * @param  {number} User.banned_until
   * @return {boolean}
   */
  getIsBanned ({ banned_until: bannedUntil }) {
    return Date.now() < bannedUntil
  }

  /**
   * Creates the "bannedUntilDate" computed property.
   *
   * @param  {number} User.banned_until
   * @return {string|boolean}
   */
  getBannedUntilDate ({ banned_until: bannedUntil }) {
    if (Date.now() > bannedUntil) return false

    return moment(bannedUntil).format('DD/MM/YYYY [às] HH:mm')
  }

  /**
   * Creates a getter to the "tag" property.
   *
   * @param  {string} tag
   * @return {string}
   */
  getTag (tag) {
    return tag || '___'
  }

  /**
   * Creates a getter to the "gender" property.
   *
   * @param  {string} gender
   * @return {string}
   */
  getGender (gender) {
    switch (gender) {
      case 'M': return 'Masculino'
      case 'F': return 'Feminino'
      default: return 'Não Especificado'
    }
  }

  /**
   * Creates a getter to the "location" property.
   *
   * @param  {string} location
   * @return {string}
   */
  getLocation (location) {
    switch (location) {
      case 'BR': return 'Brasil'
      case 'PT': return 'Portugal'
      case 'AO': return 'Angola'
      case 'MZ': return 'Moçambique'
      case 'OTHER': return 'Outro'
      default: return 'Não Especificado'
    }
  }

  /**
   * ---------------------------------------------------------------------
   * Relationships
   * ---------------------------------------------------------------------
   *
   * The methods defined below are used to establish relationships between
   * other models.
   *
   */

  groups () {
    return this
      .belongsToMany('App/Models/Group')
      .pivotTable('pivot_group_user')
  }

  /* primaryGroup () {
    this
      .belongsToMany('App/Models/Group')
      .pivotTable('pivot_group_user')
      .orderBy('order', 'asc')
      .limit(1)
  } */

  promoter () {
    return this.belongsTo('App/Models/User', 'promoter_id')
  }

  tickets () {
    return this.hasMany('App/Models/ErrorTicket', 'id', 'author_id')
  }

  // TODO: #crh
  timeline () {
    return this.hasMany('App/Models/CrhRequest', 'id', 'affected_id')
  }

  position () {
    return this.belongsTo('App/Models/Position')
  }

  posts () {
    return this.hasMany('App/Models/Post')
  }

  userSearches () {
    return this.hasMany('App/Models/LastUserSearch')
  }

  ips () {
    return this.hasMany('App/Models/Ip')
  }

  notifications () {
    return this.hasMany('App/Models/Notification')
  }

  logs () {
    return this.hasMany('App/Models/Log')
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
