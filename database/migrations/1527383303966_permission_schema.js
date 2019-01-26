'use strict'

const Schema = use('Schema')

class PermissionSchema extends Schema {
  up() {
    this.create('permissions', (table) => {
      table.increments()
      table.timestamps()

      table
        .string('alias', 80)
        .notNullable()
        .unique()
        .index('alias')
      table
        .boolean('is_permanent')
        .notNullable()
        .defaultTo(false)

      table.string('name', 100).notNullable()
      table.text('description').defaultTo(null)
    })
  }

  down() {
    this.drop('permissions')
  }
}

module.exports = PermissionSchema
