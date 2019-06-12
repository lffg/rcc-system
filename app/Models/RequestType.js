const Model = use('Model');

class RequestType extends Model {
  /**
   * Método de boot (inicialização).
   *
   * @static
   * @return {void}
   */
  static boot() {
    super.boot();

    this.addHook('beforeCreate', 'AliasHook.generateAlias');
    this.addTrait('RequestType');
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
    return this.belongsTo('App/Models/RequestController', 'controller_id');
  }

  actions() {
    return this.belongsToMany(
      'App/Models/RequestAction',
      'type_id',
      'action_id'
    ).pivotTable('pivot_request_action_type');
  }

  requests() {
    return this.hasMany('App/Models/Request', 'id', 'type_id');
  }
}

module.exports = RequestType;
