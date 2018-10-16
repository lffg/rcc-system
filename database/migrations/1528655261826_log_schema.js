'use strict'

const Schema = use('Schema')

class LogSchema extends Schema {
  up () {
    this.create('logs', (table) => {
      table.increments()

      table.text('log').notNullable()
      table.string('ip', 45).defaultTo(null)

      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id').onDelete('cascade')

      table.timestamps()
    })
  }

  down () {
    this.drop('logs')
  }
}

module.exports = LogSchema
