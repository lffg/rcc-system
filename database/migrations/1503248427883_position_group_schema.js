const Schema = use('Schema');

class PositionGroupSchema extends Schema {
  up() {
    this.create('position_groups', (table) => {
      table.increments();

      table.string('alias', 80).notNullable().unique().index();
      table.boolean('is_permanent').notNullable().defaultTo(false);

      table.string('name', 190).notNullable();
      table.text('description').notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop('position_groups');
  }
}

module.exports = PositionGroupSchema;
