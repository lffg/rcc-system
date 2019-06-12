const yiq = require('yiq');

const Model = use('Model');

class Group extends Model {
  /**
   * Método de boot (inicialização).
   *
   * @static
   * @return {void}
   */
  static boot() {
    super.boot();

    this.addHook('beforeCreate', 'AliasHook.generateAlias');
    this.addHook('beforeCreate', 'GroupHook.setOrder');
    this.addHook('afterDelete', 'GroupHook.resetOrder');
    this.addTrait('Group');
  }

  /**
   * Getter que define as propriedades escondidas.
   *
   * @static
   * @return {string[]}
   */
  static get hidden() {
    return ['created_at', 'updated_at'];
  }

  /**
   * Getter que define as propriedades computadas.
   *
   * @static
   * @return {string[]}
   */
  static get computed() {
    return ['colorYiq'];
  }

  /**
   * Cria a propriedade computada "colorYiq".
   *
   * @param  {string} Group.color
   * @return {string}
   */
  getColorYiq({ color }) {
    return yiq(color || '#000');
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

  users() {
    return this.belongsToMany('App/Models/User')
      .pivotTable('pivot_group_user')
      .withPivot(['is_moderator']);
  }

  permissions() {
    return this.belongsToMany('App/Models/Permission').pivotTable(
      'pivot_group_permission'
    );
  }
}

module.exports = Group;
