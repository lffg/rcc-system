'use strict'

const Model = use('Model')

class PositionGroup extends Model {
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

  positions () {
    return this.hasMany('App/Models/Position', 'id', 'group_id')
      .orderBy('order', 'asc')
  }
}

module.exports = PositionGroup
