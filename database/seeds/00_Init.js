const Database = use('Database');

class Init {
  async run() {
    const tables = [
      'groups',
      'pivot_group_user',
      'position_groups',
      'positions',
      'permissions',
      'pivot_group_permission',
      'users',
      'notifications',
      'request_controllers',
      'request_edit_logs',
      'request_actions',
      'request_reviews',
      'request_types',
      'requests',
      'pivot_request_action_type',
      'posts'
    ];

    for (const table of tables) {
      await Database.raw(`TRUNCATE "${table}" RESTART IDENTITY CASCADE;`);
    }

    console.log('Tabelas resetadas.');
  }
}

module.exports = Init;
