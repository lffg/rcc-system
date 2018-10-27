'use strict'

const Schema = use('Schema')

class RequestReviewSchema extends Schema {
  up () {
    this.create('request_reviews', (table) => {
      table.increments()

      table.integer('request_id').unsigned().index('request_id').notNullable()
      table.foreign('request_id').references('requests.id').onDelete('cascade')

      table.integer('author_id').unsigned()
      table.foreign('author_id').references('users.id').onDelete('set null')

      table.boolean('is_dominant').notNullable().defaultTo(false)
      table.enum('type', ['COMMENT', 'REVIEW', 'LOG']).notNullable().defaultTo('COMMENT')

      table.string('body').notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('request_reviews')
  }
}

module.exports = RequestReviewSchema
