const Database = use('Database');

const TABLE_NAMES = [
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

class Init {
  async run() {
    for (const table of TABLE_NAMES) {
      await Database.raw(`TRUNCATE "${table}" RESTART IDENTITY CASCADE;`);
    }

    console.log('Tabelas resetadas.');
  }
}

module.exports = Init;
module.exports.TABLE_NAMES = TABLE_NAMES; // HACK: Fixme
