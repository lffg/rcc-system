'use strict'

const Model = use('Model')

class RequestReview extends Model {
  /**
   * ---------------------------------------------------------------------
   * Relationships
   * ---------------------------------------------------------------------
   *
   * The methods defined below are used to establish relationships between
   * other models.
   *
   */

  request () {
    return this.belongsTo('App/Models/Request')
  }

  author () {
    return this.belongsTo('App/Models/User', 'author_id')
  }
}

module.exports = RequestReview
