'use strict'

const Model = use('Model')

class RequestController extends Model {
  /**
   * Boot method
   *
   * @static
   * @return {void}
   */
  static boot () {
    super.boot()

    this.addTrait('RequestController')

    this.addTrait('@provider:Lucid/Slugify', {
      fields: { slug: 'name' },
      strategy: 'dbIncrement',
      disableUpdates: false
    })
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

  listPositions () {
    return this
      .belongsToMany('App/Models/Position', 'controller_id', 'position_id')
      .pivotTable('pivot_request_controller_position')
  }

  requests () {
    return this.hasMany('App/Models/Request', 'id', 'controller_id')
  }

  types () {
    return this.hasMany('App/Models/RequestType', 'id', 'controller_id')
  }
}

module.exports = RequestController
