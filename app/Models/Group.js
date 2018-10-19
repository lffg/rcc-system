'use strict'

const yiq = require('yiq')

const Model = use('Model')

class Group extends Model {
  /**
   * Boot method
   *
   * @static
   * @return {void}
   */
  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'AliasHook.generateAlias')
    this.addHook('beforeCreate', 'GroupHook.setOrder')
    this.addHook('afterDelete', 'GroupHook.resetOrder')
    this.addTrait('Group')
  }

  /**
   * Getter that defines the hidden properties.
   *
   * @static
   * @return {string[]}
   */
  static get hidden () {
    return ['created_at', 'updated_at']
  }

  /**
   * Getter that defines the computed properties.
   *
   * @static
   * @return {string[]}
   */
  static get computed () {
    return ['colorYiq']
  }

  /**
   * Create the "colorYiq" computed property.
   *
   * @param  {string} Group.color
   * @return {string}
   */
  getColorYiq ({ color }) {
    return yiq(color)
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

  users () {
    return this
      .belongsToMany('App/Models/User')
      .pivotTable('pivot_group_user')
      .withPivot(['is_moderator'])
  }

  permissions () {
    return this
      .belongsToMany('App/Models/Permission')
      .pivotTable('pivot_group_permission')
  }
}

module.exports = Group
