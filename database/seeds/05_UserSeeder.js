const requests = require('../seeds-data/requests-entries');
const { users } = require('../seeds-data/users');

const { RequestInterface } = use('App/Services/Request');
const Group = use('App/Models/Group');
const User = use('App/Models/User');
const Database = use('Database');

class UserSeeder {
  async run() {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0');

    await this.createUsers();
    console.log('Usuários criados.');

    await Database.raw('SET FOREIGN_KEY_CHECKS = 1');

    await this.setGroupRelations();
    console.log('Relação entre usuários e grupo criadas.');

    // console.log('Aguarde... Requisições estão sendo criadas...')
    // await this.createRequests()
    // console.log('Requisições de teste para usuários criadas.')
  }

  async createUsers() {
    for (const data of users) {
      const user = new User();
      user.merge(data);
      await user.save();
    }
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

  async setGroupRelations() {
    const luiz = await User.findByOrFail('username', 'luuuiiiz.');
    const dean = await User.findByOrFail('username', 'Dean.Santos');
    const admin = await Group.findBy('alias', 'ADMIN');
    const dev = await Group.findBy('alias', 'DEV');
    const crh = await Group.findBy('alias', 'CRH');

    const row = (row) => {
      row.is_moderator = true;
    };

    await luiz.groups().attach([admin.id, dev.id], row);
    await dean.groups().attach([admin.id, dev.id, crh.id], row);
  }
}

module.exports = UserSeeder;
