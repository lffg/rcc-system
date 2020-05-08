const Schema = use('Schema');

class RequestReviewSchema extends Schema {
  up() {
    this.create('request_reviews', (table) => {
      table.increments();
      table.timestamps();

      table.integer('request_id').unsigned().index().notNullable();
      table.foreign('request_id').references('requests.id').onDelete('cascade');

      table.integer('author_id').unsigned().notNullable();
      table.foreign('author_id').references('users.id').onDelete('cascade');

      table
        .enum('type', ['COMMENT', 'REVIEW', 'LOG'])
        .notNullable()
        .defaultTo('COMMENT');

      table.string('body').notNullable();
    });
  }

  down() {
    this.drop('request_reviews');
  }
}

module.exports = RequestReviewSchema;
