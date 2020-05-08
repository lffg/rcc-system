const Schema = use('Schema');

class NotificationSchema extends Schema {
  up() {
    this.create('notifications', (table) => {
      table.increments();
      table.boolean('is_read').defaultTo(false);

      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id').onDelete('cascade');

      table.text('action_uri').defaultTo(null);
      table.text('title').notNullable();
      table.text('description').defaultTo(null);

      table.timestamps();
    });
  }

  down() {
    this.drop('notifications');
  }
}

module.exports = NotificationSchema;
