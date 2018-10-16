'use strict'

const Schema = use('Schema')

class PostTagSchema extends Schema {
  up () {
    this.create('post_tags', (table) => {
      table.increments()

      table.string('tag', 75).notNullable().unique()

      table.timestamps()
    })
  }

  down () {
    this.drop('post_tags')
  }
}

module.exports = PostTagSchema
