const Schema = use('Schema');

class PostSchema extends Schema {
  up() {
    this.create('posts', (table) => {
      table.increments();

      table.string('title', 175).notNullable();
      table.string('slug', 191);

      table.text('description').defaultTo(null);
      table.string('image', 191).defaultTo(null);
      table.text('body').notNullable();

      table
        .boolean('is_hidden')
        .notNullable()
        .defaultTo(false);
      table
        .boolean('is_locked')
        .notNullable()
        .defaultTo(false);

      table
        .integer('user_id')
        .unsigned()
        .index()
        .notNullable();
      table.foreign('user_id').references('users.id');

      table.timestamps();
    });
  }

  down() {
    this.drop('posts');
  }
}

module.exports = PostSchema;
