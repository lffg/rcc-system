const Model = use('Model');

class Post extends Model {
  /**
   * Método de boot (inicialização).
   *
   * @static
   * @return {void}
   */
  static boot() {
    super.boot();

    this.addTrait('@provider:Lucid/Slugify', {
      fields: { slug: 'title' },
      strategy: 'dbIncrement',
      disableUpdates: false
    });
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

  user() {
    return this.belongsTo('App/Models/User');
  }

  tags() {
    return this.belongsToMany('App/Models/PostTag').pivotTable(
      'pivot_post_tag'
    );
  }
}

module.exports = Post;
