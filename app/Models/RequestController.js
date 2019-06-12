const Model = use('Model');

class RequestController extends Model {
  /**
   * Método de boot (inicialização).
   *
   * @static
   * @return {void}
   */
  static boot() {
    super.boot();

    this.addHook('beforeCreate', 'AliasHook.generateAlias');
    this.addTrait('RequestController');

    this.addTrait('@provider:Lucid/Slugify', {
      fields: { slug: 'name' },
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

  requests() {
    return this.hasMany('App/Models/Request', 'id', 'controller_id');
  }

  types() {
    return this.hasMany('App/Models/RequestType', 'id', 'controller_id');
  }
}

module.exports = RequestController;
