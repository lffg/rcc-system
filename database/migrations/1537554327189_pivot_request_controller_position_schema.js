'use strict'

const Schema = use('Schema')

class PivotRequestActionTypeSchema extends Schema {
  up () {
    this.create('pivot_request_controller_position', (table) => {
      table.increments()
      table.integer('order').notNullable().unsigned()

      table.integer('controller_id').unsigned().index('controller_id').notNullable()
      table.foreign('controller_id').references('request_controllers.id').onDelete('cascade')

      table.integer('position_id').unsigned().index('position_id').notNullable()
      table.foreign('position_id').references('positions.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('pivot_request_controller_position')
  }
}

module.exports = PivotRequestActionTypeSchema
