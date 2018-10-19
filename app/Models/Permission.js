'use strict'

const Model = use('Model')

class Permission extends Model {
  /**
   * Boot method
   *
   * @static
   * @return {void}
   */
  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'AliasHook.generateAlias')
  }
}

module.exports = Permission
