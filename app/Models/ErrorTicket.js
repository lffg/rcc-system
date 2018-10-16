'use strict'

const Model = use('Model')

class ErrorTicket extends Model {
  /**
   * ---------------------------------------------------------------------
   * Relationships
   * ---------------------------------------------------------------------
   *
   * The methods defined below are used to establish relationships between
   * other models.
   *
   */

  author () {
    return this.belongsTo('App/Models/User', 'author_id')
  }

  admin () {
    return this.belongsTo('App/Models/User', 'admin_id')
  }
}

module.exports = ErrorTicket
