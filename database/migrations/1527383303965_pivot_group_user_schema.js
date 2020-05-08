// -- PIVOT

const Schema = use('Schema');

class PivotGroupUserSchema extends Schema {
  up() {
    this.create('pivot_group_user', (table) => {
      table.increments();

      table.integer('group_id').unsigned().index().notNullable();
      table.foreign('group_id').references('groups.id').onDelete('cascade');

      table.integer('user_id').unsigned().index().notNullable();
      table.foreign('user_id').references('users.id').onDelete('cascade');

      table.boolean('is_moderator').defaultTo(false).notNullable();
    });
  }

  down() {
    this.drop('pivot_group_user');
  }
}

module.exports = PivotGroupUserSchema;
