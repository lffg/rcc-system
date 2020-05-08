const Schema = use('Schema');

class GroupsSchema extends Schema {
  up() {
    this.create('groups', (table) => {
      table.increments();
      table.integer('order').notNullable().unsigned();

      table.string('alias', 80).notNullable().unique().index();
      table.boolean('is_permanent').notNullable().defaultTo(false);

      table.string('name', 100).notNullable();
      table.text('description').defaultTo(null);
      table.string('icon', 100).defaultTo(null);
      table.string('color', 30).notNullable();

      table.boolean('is_hidden').notNullable().defaultTo(false);

      table.timestamps();
    });
  }

  down() {
    this.drop('groups');
  }
}

module.exports = GroupsSchema;
