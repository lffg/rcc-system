'use strict'

const Model = use('Model')

class Permission extends Model {
  /**
   * Boot method
   *
   * @static
   * @return {void}
   */
  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'AliasHook.generateAlias')
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
      .pivotTable('pivot_group_permission')
  }
}

module.exports = Permission
