const { permissions } = require('../seeds-data/permissions');

const Permission = use('App/Models/Permission');
const Group = use('App/Models/Group');

class PermissionSeeder {
  async run() {
    await this.createPermissions();
    console.log('Permissões criadas.');
    console.log('Relação Permissões <-> Grupos estabelecida.');
  }

  async createPermissions() {
    for (const data of permissions) {
      const groups = data.__groups__ || [];
      delete data.__groups__;

      const permission = new Permission();
      permission.merge(data);
      await permission.save();

      for (const groupId of groups) {
        const group = await Group.findOrFail(groupId);
        await permission.groups().attach([group.id]);
      }
    }
  }
}

module.exports = PermissionSeeder;
