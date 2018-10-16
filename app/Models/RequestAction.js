'use strict'

const Model = use('Model')

class RequestAction extends Model {
  /**
   * ---------------------------------------------------------------------
   * Relationships
   * ---------------------------------------------------------------------
   *
   * The methods defined below are used to establish relationships between
   * other models.
   *
   */

  types () {
    return this
      .belongsToMany('App/Models/RequestType', 'action_id', 'type_id')
      .pivotTable('pivot_request_action_type')
  }
}

module.exports = RequestAction
