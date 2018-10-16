'use strict'

const Group = use('App/Models/Group')
const Database = use('Database')

class GroupSeeder {
  async run () {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0')
    await Group.truncate()
    await Database.raw('TRUNCATE TABLE pivot_group_user')
    await Database.raw('SET FOREIGN_KEY_CHECKS = 1')

    for (const data of [
      { name: 'Desenvolvedores', icon: 'fa fa-code', alias: 'DEV', color: '#4080ff', is_permanent: true },
      { name: 'Administradores', icon: 'fa fa-star', alias: 'ADMIN', color: '#e53935', is_permanent: true },
      { name: 'Corregedoria', icon: 'fa fa-gavel', color: '#111' },
      { name: 'Serviço Secreto', icon: 'fa fa-user-secret', color: '#ad1818' },
      { name: 'G.A.T.E.', icon: 'fa fa-user-secret', color: '#ad1818' },
      { name: 'C.R.H.', icon: 'fa fa-address-card', alias: 'CRH', color: '#003fab', is_permanent: true },
      { name: 'Diretoria', icon: 'fa fa-balance-scale', color: '#9e9e9e' },
      { name: 'Usuários', alias: 'USERS', color: '#607d8b', is_permanent: true }
    ]) {
      const group = new Group()
      group.fill(data)
      await group.save()
    }

    console.log('Grupos criados.')
  }
}

module.exports = GroupSeeder
