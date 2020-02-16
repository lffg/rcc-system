const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments();

      // Informações gerais:
      table
        .string('username', 80)
        .notNullable()
        .unique()
        .index();
      table.string('password', 60).defaultTo(null);

      // Informações e metadados da conta:
      table
        .boolean('synthetically_created')
        .notNullable()
        .defaultTo(false);

      // Informações de estado:
      table
        .enum('state', ['ACTIVE', 'INACTIVE', 'RETIRED', 'VETERAN'])
        .notNullable()
        .defaultTo('INACTIVE');
      table.date('absence_until').defaultTo(null);
      table.date('banned_until').defaultTo(null);

      // Email:
      table.string('email', 180).defaultTo(null);
      table
        .boolean('is_verified_email')
        .notNullable()
        .defaultTo(false);
      table.string('email_token', 100).defaultTo(null);
      table
        .bigint('last_verification')
        .notNullable()
        .defaultTo(0)
        .unsigned();
      table
        .bigint('email_token_limit')
        .notNullable()
        .defaultTo(0)
        .unsigned();

      // Medalhas:
      table
        .integer('temporary_bonuses')
        .notNullable()
        .defaultTo(0);
      table
        .integer('effective_bonuses')
        .notNullable()
        .defaultTo(0);

      // Informações acessórias:
      table.text('bio').defaultTo(null);
      table.enum('gender', ['M', 'F']).defaultTo(null);
      table
        .enum('location', ['BR', 'PT', 'AO', 'MZ', 'OTHER'])
        .notNullable()
        .defaultTo('OTHER');
      table.text('historic').defaultTo(null);

      // Dados de promoção:
      table
        .integer('promoter_id')
        .defaultTo(null)
        .unsigned();
      table
        .foreign('promoter_id')
        .references('users.id')
        .onDelete('set null');
      table
        .integer('position_id')
        .defaultTo(null)
        .unsigned();
      table
        .foreign('position_id')
        .references('positions.id')
        .onDelete('set null');
      table
        .string('tag', 5)
        .defaultTo(null)
        .unique();
      table
        .enum('tag_type', ['NORMAL', 'REB'])
        .notNullable()
        .defaultTo('NORMAL');
      table.datetime('change_position_date').defaultTo(null);

      // Datas:
      table
        .bigint('last_visit')
        .notNullable()
        .defaultTo(0)
        .unsigned();
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
