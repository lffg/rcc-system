const Schema = use('Schema');

class PivotRequestActionTypeSchema extends Schema {
  up() {
    this.create('pivot_request_action_type', (table) => {
      table.increments();

      table
        .integer('action_id')
        .unsigned()
        .index()
        .notNullable();
      table
        .foreign('action_id')
        .references('request_actions.id')
        .onDelete('cascade');

      table
        .integer('type_id')
        .unsigned()
        .index()
        .notNullable();
      table
        .foreign('type_id')
        .references('request_types.id')
        .onDelete('cascade');
    });
  }

  down() {
    this.drop('pivot_request_action_type');
  }
}

module.exports = PivotRequestActionTypeSchema;
