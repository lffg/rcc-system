'use strict'

const yiq = require('yiq')

const Model = use('Model')

class Position extends Model {
  /**
   * Boot method
   *
   * @static
   * @return {void}
   */
  static boot () {
    super.boot()

    this.addTrait('Position')
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

  group () {
    return this.belongsTo('App/Models/PositionGroup', 'group_id')
  }

  prev () {
    return this.belongsTo('App/Models/Position', 'prev_position_id')
  }

  next () {
    return this.belongsTo('App/Models/Position', 'next_position_id')
  }

  equivalence () {
    return this.belongsTo('App/Models/Position', 'equivalent_to_id')
  }

  users () {
    return this.hasMany('App/Models/Position', 'id', 'group_id')
  }
}

module.exports = Position
