'use strict'

const Schema = use('Schema')

class PivotPermissionPositionSchema extends Schema {
  up () {
    this.create('pivot_permission_positions', (table) => {
      table.increments()
      table.timestamps()

      table.integer('permission_id').unsigned().index('permission_id').notNullable()
      table.foreign('permission_id').references('permissions.id').onDelete('cascade')

      table.integer('position_id').unsigned().index('position_id').notNullable()
      table.foreign('position_id').references('positions.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('pivot_permission_positions')
  }
}

module.exports = PivotPermissionPositionSchema
