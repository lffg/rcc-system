'use strict'

// OPTIONAL

/*
|--------------------------------------------------------------------------
| PostSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Post = use('App/Models/Post')
const Database = use('Database')
const Factory = use('Factory')

class PostSeeder {
  async run () {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0')
    await Post.truncate()
    await Database.raw('SET FOREIGN_KEY_CHECKS = 1')

    await Factory
      .model('App/Models/Post')
      .createMany(33)

    console.log('Posts criados.')
  }
}

module.exports = PostSeeder
