const Model = use('Model');

class PositionGroup extends Model {
  /**
   * Método de boot (inicialização).
   *
   * @static
   * @return {void}
   */
  static boot() {
    super.boot();

    this.addHook('beforeCreate', 'AliasHook.generateAlias');
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

  positions() {
    return this.hasMany('App/Models/Position', 'id', 'group_id').orderBy(
      'order',
      'asc'
    );
  }
}

module.exports = PositionGroup;
