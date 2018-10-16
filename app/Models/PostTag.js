'use strict'

const Model = use('Model')

class PostTag extends Model {
  /**
   * ---------------------------------------------------------------------
   * Relationships
   * ---------------------------------------------------------------------
   *
   * The methods defined below are used to establish relationships between
   * other models.
   *
   */

  posts () {
    return this
      .belongsToMany('App/Models/Post')
      .pivotTable('pivot_post_tag')
  }
}

module.exports = PostTag
