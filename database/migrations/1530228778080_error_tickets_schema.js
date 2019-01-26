'use strict'

const Schema = use('Schema')

class ErrorTicketsSchema extends Schema {
  up() {
    this.create('error_tickets', (table) => {
      table.increments()

      table.integer('author_id').unsigned()
      table
        .foreign('author_id')
        .references('users.id')
        .onDelete('set null')

      table
        .enum('error_type', ['BUG', 'SPELLING', 'OTHER'])
        .notNullable()
        .defaultTo('OTHER')
      table.text('image_url').defaultTo(null)
      table.text('page_url').defaultTo(null)
      table.text('message').notNullable()
      table
        .enum('state', ['SOLVED', 'PENDING', 'ABANDONED'])
        .notNullable()
        .defaultTo('PENDING')

      table.integer('admin_id').unsigned()
      table
        .foreign('admin_id')
        .references('users.id')
        .onDelete('set null')

      table.timestamps()
    })
  }

  down() {
    this.drop('error_tickets')
  }
}

module.exports = ErrorTicketsSchema
