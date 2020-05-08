const Schema = use('Schema');

class UserWarningSchema extends Schema {
  up() {
    this.create('user_warnings', (table) => {
      table.increments();
      table.timestamps();
      table.date('until').notNullable();

      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id').onDelete('cascade');

      table.integer('request_id').unsigned().index().defaultTo(null);
      table
        .foreign('request_id')
        .references('requests.id')
        .onDelete('set null');
    });
  }

  down() {
    this.drop('user_warnings');
  }
}

module.exports = UserWarningSchema;
