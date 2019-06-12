const Schema = use('Schema');

class ChangeUsernameLogSchema extends Schema {
  up() {
    this.create('change_username_logs', (table) => {
      table.increments();
      table.timestamps();

      table.string('old_username', 180);
      table.string('new_username', 180);

      table
        .integer('request_id')
        .unsigned()
        .index('request_id')
        .defaultTo(null);
      table
        .foreign('request_id')
        .references('requests.id')
        .onDelete('set null');
    });
  }

  down() {
    this.drop('change_username_logs');
  }
}

module.exports = ChangeUsernameLogSchema;
