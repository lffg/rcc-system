'use strict'

const Schema = use('Schema')

class RequestControllerSchema extends Schema {
  up () {
    this.create('request_controllers', (table) => {
      table.increments()

      table.string('slug', 190)
      table.boolean('has_list').notNullable().defaultTo(true)
      table.boolean('allow_any_position').notNullable().defaultTo(false)

      table.string('name', 80).notNullable()
      table.string('color', 30).notNullable()
      table.text('description').defaultTo(null)

      table.timestamps()
    })
  }

  down () {
    this.drop('request_controllers')
  }
}

module.exports = RequestControllerSchema
