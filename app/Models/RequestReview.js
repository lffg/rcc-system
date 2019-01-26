'use strict'

const Model = use('Model')

class RequestReview extends Model {
  /**
   * ---------------------------------------------------------------------
   * Relações
   * ---------------------------------------------------------------------
   *
   * Os métodos definidos abaixo são usados para estabelecer relações
   * entre outros modelos (models).
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
