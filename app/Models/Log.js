'use strict'

const Model = use('Model')

class Log extends Model {
  /**
   * ---------------------------------------------------------------------
   * Relações
   * ---------------------------------------------------------------------
   *
   * Os métodos definidos abaixo são usados para estabelecer relações
   * entre outros modelos (models).
   *
   */

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Log
