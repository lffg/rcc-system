const Schema = use('Schema');

class LastUserSearchSchema extends Schema {
  up() {
    this.create('last_user_searches', (table) => {
      table.increments();

      table.string('username', 80).notNullable();

      table
        .integer('user_id')
        .unsigned()
        .index('user_id')
        .notNullable();
      table
        .foreign('user_id')
        .references('users.id')
        .onDelete('cascade');

      table.timestamps();
    });
  }

  down() {
    this.drop('last_user_searches');
  }
}

module.exports = LastUserSearchSchema;
