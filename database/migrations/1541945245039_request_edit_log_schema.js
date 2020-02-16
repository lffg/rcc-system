const Schema = use('Schema');

class RequestEditLogSchema extends Schema {
  up() {
    this.create('request_edit_logs', (table) => {
      table.increments();
      table.timestamps();

      table
        .integer('request_id')
        .unsigned()
        .index()
        .notNullable();
      table
        .foreign('request_id')
        .references('requests.id')
        .onDelete('cascade');

      table.integer('author_id').unsigned();
      table
        .foreign('author_id')
        .references('users.id')
        .onDelete('set null');

      table.string('edit_reason').notNullable();
    });
  }

  down() {
    this.drop('request_edit_logs');
  }
}

module.exports = RequestEditLogSchema;
