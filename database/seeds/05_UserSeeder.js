const { pick, omit } = require('lodash');
const requests = require('../seeds-data/requests-entries');
const { users } = require('../seeds-data/users');

const { RequestInterface } = use('App/Services/Request');
const Group = use('App/Models/Group');
const User = use('App/Models/User');
const Database = use('Database');

class UserSeeder {
  SELF_RELATION_KEYS = ['promoter_id'];

  async run() {
    await this.createUsers();
    console.log('Usuários criados.');

    // console.log('Aguarde... Requisições estão sendo criadas...')
    // await this.createRequests()
    // console.log('Requisições de teste para usuários criadas.')
  }

  async createUsers() {
    const usersWithRelationMap = await Promise.all(
      users.map(async (userData) => [
        await this.createUser(omit(userData, this.SELF_RELATION_KEYS)),
        pick(userData, this.SELF_RELATION_KEYS)
      ])
    );
    console.log('Usuários criados.');

    await Promise.all(
      usersWithRelationMap.map(async ([user, relationData]) => {
        user.merge(relationData);
        await user.save();
      })
    );
    console.log('Relações Usuário <-> Usuário estabelecidas.');
  }

  async createUser({ __groups__ = [], ...userData }) {
    const user = new User();
    user.merge(userData);
    await user.save();

    await Promise.all(
      __groups__.map(async (groupAlias) =>
        user
          .groups()
          .attach(
            (await Group.findBy('alias', groupAlias)).id,
            (row) => (row.is_moderator = true)
          )
      )
    );

    return user;
  }

  async createRequests() {
    const wait = (t = 0) => new Promise((resolve) => setTimeout(resolve, t));

    await Database.transaction(async (transaction) => {
      for (const payload of requests) {
        await RequestInterface.create({
          payload,
          transaction,
          systemAction: true
        });
        await wait(1000);
      }
    });
  }
}

module.exports = UserSeeder;
