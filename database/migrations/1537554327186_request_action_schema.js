'use strict'

const Schema = use('Schema')

class RequestActionSchema extends Schema {
  up() {
    this.create('request_actions', (table) => {
      table.increments()

      table
        .string('alias', 80)
        .notNullable()
        .index('alias')

      table.enum('execute_on', ['CREATE', 'UPDATE', 'APPROVE', 'REJECT'])

      table.string('name', 100).notNullable()
      table.text('description').defaultTo(null)

      table.timestamps()
    })
  }

  down() {
    this.drop('request_actions')
  }
}

module.exports = RequestActionSchema
