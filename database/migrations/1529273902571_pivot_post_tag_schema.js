'use strict'

const Schema = use('Schema')

class PivotPostTagSchema extends Schema {
  up () {
    this.create('pivot_post_tag', (table) => {
      table.increments()

      table.integer('post_id').unsigned().index('post_id').notNullable()
      table.foreign('post_id').references('posts.id').onDelete('cascade')

      table.integer('tag_id').unsigned().index('tag_id').notNullable()
      table.foreign('tag_id').references('post_tags.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('pivot_post_tag')
  }
}

module.exports = PivotPostTagSchema
