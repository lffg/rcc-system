'use strict'

const Model = use('Model')

class Request extends Model {
  /**
   * Método de boot (inicialização).
   *
   * @static
   * @return {void}
   */
  static boot() {
    super.boot()

    this.addHook('beforeSave', 'RequestHook.createIntegrityToken')
    this.addTrait('Request')
  }

  /**
   * ---------------------------------------------------------------------
   * Relações
   * ---------------------------------------------------------------------
   *
   * Os métodos definidos abaixo são usados para estabelecer relações
   * entre outros modelos (models).
   *
   */

  controller() {
    return this.belongsTo('App/Models/RequestController', 'controller_id')
  }

  type() {
    return this.belongsTo('App/Models/RequestType', 'type_id')
  }

  reviews() {
    return this.hasMany('App/Models/RequestReview')
  }

  editLogs() {
    return this.hasMany('App/Models/RequestEditLog')
  }

  changeUsernameLogs() {
    return this.hasMany('App/Models/ChangeUsernameLog')
  }

  userWarnings() {
    return this.hasMany('App/Models/UserWarning')
  }

  author() {
    return this.belongsTo('App/Models/User', 'author_id')
  }

  receiver() {
    return this.belongsTo('App/Models/User', 'receiver_id')
  }

  reviwer() {
    return this.belongsTo('App/Models/User', 'reviwer_id')
  }
}

module.exports = Request
