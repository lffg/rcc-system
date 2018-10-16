'use strict'

const Model = use('Model')

class Post extends Model {
  /**
   * Boot method
   *
   * @static
   * @return {void}
   */
  static boot () {
    super.boot()

    this.addTrait('@provider:Lucid/Slugify', {
      fields: { slug: 'title' },
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

  user () {
    return this.belongsTo('App/Models/User')
  }

  tags () {
    return this
      .belongsToMany('App/Models/PostTag')
      .pivotTable('pivot_post_tag')
  }
}

module.exports = Post
