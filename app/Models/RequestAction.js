const Model = use('Model');

class RequestAction extends Model {
  /**
   * ---------------------------------------------------------------------
   * Relações
   * ---------------------------------------------------------------------
   *
   * Os métodos definidos abaixo são usados para estabelecer relações
   * entre outros modelos (models).
   *
   */

  types() {
    return this.belongsToMany(
      'App/Models/RequestType',
      'action_id',
      'type_id'
    ).pivotTable('pivot_request_action_type');
  }
}

module.exports = RequestAction;
