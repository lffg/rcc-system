'use strict'

const Model = use('Model')

class Request extends Model {
  /**
   * ---------------------------------------------------------------------
   * Relações
   * ---------------------------------------------------------------------
   *
   * Os métodos definidos abaixo são usados para estabelecer relações
   * entre outros modelos (models).
   *
   */

  controller () {
    return this.belongsTo('App/Models/RequestController', 'controller_id')
  }

  type () {
    return this.belongsTo('App/Models/RequestType', 'type_id')
  }

  reviews () {
    return this.hasMany('App/Models/RequestReview')
  }

  author () {
    return this.belongsTo('App/Models/User', 'author_id')
  }

  receiver () {
    return this.belongsTo('App/Models/User', 'receiver_id')
  }
}

module.exports = Request
