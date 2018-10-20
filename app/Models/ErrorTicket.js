'use strict'

const Model = use('Model')

class ErrorTicket extends Model {
  /**
   * ---------------------------------------------------------------------
   * Relações
   * ---------------------------------------------------------------------
   *
   * Os métodos definidos abaixo são usados para estabelecer relações
   * entre outros modelos (models).
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
