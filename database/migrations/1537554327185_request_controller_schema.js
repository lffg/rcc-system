const Schema = use('Schema');

class RequestControllerSchema extends Schema {
  up() {
    this.create('request_controllers', (table) => {
      table.increments();

      table.string('alias', 80).notNullable().unique().index();
      table.boolean('is_permanent').notNullable().defaultTo(false);

      table.string('slug', 190);
      table.boolean('has_list').notNullable().defaultTo(true);
      table.boolean('is_crh').notNullable().defaultTo(true);

      table.string('name', 80).notNullable();
      table.string('color', 30).notNullable();
      table.text('description').defaultTo(null);

      table.timestamps();
    });
  }

  down() {
    this.drop('request_controllers');
  }
}

module.exports = RequestControllerSchema;
