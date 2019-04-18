const Model = use('Model')

class PostTag extends Model {
  /**
   * ---------------------------------------------------------------------
   * Relações
   * ---------------------------------------------------------------------
   *
   * Os métodos definidos abaixo são usados para estabelecer relações
   * entre outros modelos (models).
   *
   */

  posts() {
    return this.belongsToMany('App/Models/Post').pivotTable('pivot_post_tag')
  }
}

module.exports = PostTag
