'use strict'

const Model = use('Model')

class Notification extends Model {
  /**
   * ---------------------------------------------------------------------
   * Relationships
   * ---------------------------------------------------------------------
   *
   * The methods defined below are used to establish relationships between
   * other models.
   *
   */

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Notification
