const Model = use('Model')

class Notification extends Model {
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

module.exports = Notification
