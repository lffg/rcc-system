'use strict'

const Schema = use('Schema')

class IpsSchema extends Schema {
  up () {
    this.create('ips', (table) => {
      table.increments()

      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id').onDelete('cascade')

      table.string('ip', 45).notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('ips')
  }
}

module.exports = IpsSchema
