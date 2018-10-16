'use strict'

const Schema = use('Schema')

class RequestSchema extends Schema {
  up () {
    this.create('requests', (table) => {
      table.increments()
      table.timestamps()

      table.integer('controller_id').unsigned().index('controller_id').notNullable()
      table.foreign('controller_id').references('request_controllers.id').onDelete('cascade')
      table.integer('type_id').unsigned().index('type_id')
      table.foreign('type_id').references('request_types.id').onDelete('set null')

      // --- Config
      table.boolean('is_reviewable').notNullable().defaultTo(true)
      table.enum('crh_state', ['APPROVED', 'PENDING', 'REJECTED', 'NON_CRH']).notNullable().defaultTo('PENDING')

      // --- USER FIELDS
      table.integer('author_id').index('author_id').unsigned()
      table.foreign('author_id').references('users.id').onDelete('set null')
      table.integer('receiver_id').index('receiver_id').unsigned().defaultTo(null)
      table.foreign('receiver_id').references('users.id').onDelete('set null')

      // --- FIELDS
      table.integer('before_position_id').unsigned().index('before_position_id').defaultTo(null)
      table.foreign('before_position_id').references('positions.id').onDelete('set null')
      table.integer('after_position_id').unsigned().index('after_position_id').defaultTo(null)
      table.foreign('after_position_id').references('positions.id').onDelete('set null')

      table.text('reason').defaultTo(null)
      table.text('permission').defaultTo(null)
      table.text('notes').defaultTo(null)
      table.text('asked_by').defaultTo(null)

      table.string('tag', 10).defaultTo(null)
      table.text('price').defaultTo(null)
      table.integer('absence_days').unsigned().defaultTo(null)
      table.integer('banned_days').unsigned().defaultTo(null)
      table.integer('bonuses').defaultTo(null)
    })
  }

  down () {
    this.drop('requests')
  }
}

module.exports = RequestSchema
