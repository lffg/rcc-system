'use strict'

const yiq = require('yiq')

const Model = use('Model')

class Position extends Model {
  /**
   * Método de boot (inicialização).
   *
   * @static
   * @return {void}
   */
  static boot() {
    super.boot()

    this.addTrait('Position')
  }

  /**
   * Getter que define as propriedades computadas.
   *
   * @static
   * @return {string[]}
   */
  static get computed() {
    return ['colorYiq']
  }

  /**
   * Cria a propriedade computada "colorYiq".
   *
   * @param  {string} Group.color
   * @return {string}
   */
  getColorYiq({ color }) {
    return yiq(color)
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

  group() {
    return this.belongsTo('App/Models/PositionGroup', 'group_id')
  }

  prev() {
    return this.belongsTo('App/Models/Position', 'prev_position_id')
  }

  next() {
    return this.belongsTo('App/Models/Position', 'next_position_id')
  }

  equivalence() {
    return this.belongsTo('App/Models/Position', 'equivalent_to_id')
  }

  users() {
    return this.hasMany('App/Models/Position', 'id', 'group_id')
  }
}

module.exports = Position
