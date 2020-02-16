const Schema = use('Schema');

class PivotGroupPermissionSchema extends Schema {
  up() {
    this.create('pivot_group_permission', (table) => {
      table.increments();
      table.timestamps();

      table
        .integer('group_id')
        .unsigned()
        .index()
        .notNullable();
      table
        .foreign('group_id')
        .references('groups.id')
        .onDelete('cascade');

      table
        .integer('permission_id')
        .unsigned()
        .index()
        .notNullable();
      table
        .foreign('permission_id')
        .references('permissions.id')
        .onDelete('cascade');
    });
  }

  down() {
    this.drop('pivot_group_permission');
  }
}

module.exports = PivotGroupPermissionSchema;
