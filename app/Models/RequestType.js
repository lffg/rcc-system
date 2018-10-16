'use strict'

const Model = use('Model')

class RequestType extends Model {
  /**
   * Boot method
   *
   * @static
   * @return {void}
   */
  static boot () {
    super.boot()

    this.addTrait('RequestType')
  }

  /**
   * ---------------------------------------------------------------------
   * Relationships
   * ---------------------------------------------------------------------
   *
   * The methods defined below are used to establish relationships between
   * other models.
   *
   */

  controller () {
    return this.belongsTo('App/Models/RequestController', 'controller_id')
  }

  actions () {
    return this
      .belongsToMany('App/Models/RequestAction', 'type_id', 'action_id')
      .pivotTable('pivot_request_action_type')
  }

  requests () {
    return this.hasMany('App/Models/Request', 'id', 'type_id')
  }
}

module.exports = RequestType
