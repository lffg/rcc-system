const Database = use('Database');

const Group = use('App/Models/Group');
const PositionGroup = use('App/Models/PositionGroup');
const Position = use('App/Models/Position');
const Permission = use('App/Models/Permission');
const User = use('App/Models/User');
const Notification = use('App/Models/Notification');
const RequestController = use('App/Models/RequestController');
const RequestEditLog = use('App/Models/RequestEditLog');
const RequestAction = use('App/Models/RequestAction');
const RequestReview = use('App/Models/RequestReview');
const RequestType = use('App/Models/RequestType');
const Request = use('App/Models/Request');
const Post = use('App/Models/Post');

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
