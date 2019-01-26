'use strict'

const Model = use('Model')

class Permission extends Model {
  /**
   * Método de boot (inicialização).
   *
   * @static
   * @return {void}
   */
  static boot() {
    super.boot()

    this.addHook('beforeCreate', 'AliasHook.generateAlias')
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

  groups() {
    return this.belongsToMany('App/Models/Group').pivotTable(
      'pivot_group_permission'
    )
  }
}

module.exports = Permission
