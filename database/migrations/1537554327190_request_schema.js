const Schema = use('Schema');

class RequestSchema extends Schema {
  up() {
    this.create('requests', (table) => {
      table.increments();

      table.timestamps();
      table.datetime('last_edit').defaultTo(null);
      table.datetime('last_review').defaultTo(null);

      table.string('integrity_token', 40).defaultTo(null);

      table.integer('controller_id').unsigned().index().notNullable();
      table
        .foreign('controller_id')
        .references('request_controllers.id')
        .onDelete('cascade');
      table.integer('type_id').unsigned().index();
      table
        .foreign('type_id')
        .references('request_types.id')
        .onDelete('set null');

      // --- CRH
      table.boolean('is_crh').notNullable().defaultTo(true);
      table
        .enum('crh_state', ['APPROVED', 'PENDING', 'REJECTED'])
        .defaultTo(null);
      table.boolean('is_reviwed').notNullable().defaultTo(false);
      table.integer('reviwer_id').index().unsigned();
      table.foreign('reviwer_id').references('users.id').onDelete('set null');

      // --- USER FIELDS
      table.integer('author_id').index().unsigned();
      table.foreign('author_id').references('users.id').onDelete('set null');
      table.integer('receiver_id').index().unsigned().notNullable();
      table.foreign('receiver_id').references('users.id').onDelete('cascade');

      // --- COMPUTED FIELDS
      table.text('computed_title').defaultTo(null);
      table.text('computed_body').defaultTo(null);
      table.text('computed_template').defaultTo(null);

      // --- FIELDS
      table.integer('before_position_id').unsigned().index().defaultTo(null);
      table
        .foreign('before_position_id')
        .references('positions.id')
        .onDelete('set null');
      table.integer('after_position_id').unsigned().index().defaultTo(null);
      table
        .foreign('after_position_id')
        .references('positions.id')
        .onDelete('set null');

      table.text('reason').defaultTo(null);
      table.text('permission').defaultTo(null);
      table.text('notes').defaultTo(null);
      table.text('asked_by').defaultTo(null);

      table.string('tag', 10).defaultTo(null);
      table.text('price').defaultTo(null);
      table.date('absence_until').defaultTo(null);
      table.date('banned_until').defaultTo(null);
      table.integer('bonuses').defaultTo(null);
      table.string('extra_user_1', 180).defaultTo(null);
      table.string('extra_user_2', 180).defaultTo(null);
      table.string('extra_user_3', 180).defaultTo(null);
      table.string('extra_user_4', 180).defaultTo(null);
    });
  }

  down() {
    this.drop('requests');
  }
}

module.exports = RequestSchema;
