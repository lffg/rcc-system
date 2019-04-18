const Schema = use('Schema')

class PositionSchema extends Schema {
  up() {
    this.create('positions', (table) => {
      table.increments()
      table
        .integer('order')
        .notNullable()
        .unsigned()

      table
        .integer('prev_position_id')
        .defaultTo(null)
        .unsigned()
      table
        .foreign('prev_position_id')
        .references('positions.id')
        .onDelete('set null')
      table
        .integer('next_position_id')
        .defaultTo(null)
        .unsigned()
      table
        .foreign('next_position_id')
        .references('positions.id')
        .onDelete('set null')
      table
        .integer('equivalent_to_id')
        .defaultTo(null)
        .unsigned()
      table
        .foreign('equivalent_to_id')
        .references('positions.id')
        .onDelete('set null')

      table
        .integer('group_id')
        .notNullable()
        .unsigned()
      table
        .foreign('group_id')
        .references('position_groups.id')
        .onDelete('cascade')

      table
        .string('alias', 80)
        .notNullable()
        .unique()
        .index('alias')
      table
        .boolean('is_permanent')
        .notNullable()
        .defaultTo(true)
      table
        .boolean('is_available_to_crh')
        .notNullable()
        .defaultTo(true)

      table
        .string('name', 180)
        .notNullable()
        .unique()
      table
        .integer('salary')
        .defaultTo(0)
        .notNullable()

      table.boolean('officer').notNullable()
      table.string('color', 30).notNullable()

      table.timestamps()
    })
  }

  down() {
    this.drop('positions')
  }
}

module.exports = PositionSchema
