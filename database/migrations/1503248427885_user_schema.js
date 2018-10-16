'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()

      // General info:
      table.string('username', 80).notNullable().unique().index('username')
      table.string('password', 60).defaultTo(null)
      table.string('tag', 5).defaultTo(null).unique()

      // State info:
      table.enum('state', ['ACTIVE', 'INACTIVE', 'RETIRED', 'VETERAN']).notNullable().defaultTo('INACTIVE')
      table.integer('absence_days').notNullable().defaultTo(0).unsigned()
      table.bigint('absence_start').notNullable().defaultTo(0).unsigned()
      table.bigint('banned_until').notNullable().defaultTo(0).unsigned()

      // Email:
      table.string('email', 180).defaultTo(null)
      table.boolean('is_verified_email').notNullable().defaultTo(false)
      table.string('email_token', 100).defaultTo(null)
      table.bigint('last_verification').notNullable().defaultTo(0).unsigned()
      table.bigint('email_token_limit').notNullable().defaultTo(0).unsigned()

      // Creation info:
      table.boolean('synthetically_created').notNullable().defaultTo(false)

      // Bonuses info:
      table.integer('temporary_bonuses').notNullable().defaultTo(0)
      table.integer('effective_bonuses').notNullable().defaultTo(0)

      // Extra info:
      table.text('bio').defaultTo(null)
      table.enum('gender', ['M', 'F']).defaultTo(null)
      table.enum('location', ['BR', 'PT', 'AO', 'MZ', 'OTHER']).notNullable().defaultTo('OTHER')
      table.text('historic').defaultTo(null)

      // Promotion fields.
      table.integer('promoter_id').defaultTo(null).unsigned()
      table.foreign('promoter_id').references('users.id').onDelete('set null')
      table.integer('position_id').defaultTo(null).unsigned()
      table.foreign('position_id').references('positions.id').onDelete('set null')
      table.bigint('change_position_date').notNullable().defaultTo(0).unsigned()

      // Timestamps:
      table.bigint('last_visit').notNullable().defaultTo(0).unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
