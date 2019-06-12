const Group = use('App/Models/Group');

class GroupSeeder {
  async run() {
    for (const [index, data] of [
      {
        name: 'Desenvolvedores',
        icon: 'fa fa-code',
        alias: 'DEV',
        color: '#4080ff',
        is_permanent: true
      },
      {
        name: 'Administradores',
        icon: 'fa fa-star',
        alias: 'ADMIN',
        color: '#e53935',
        is_permanent: true
      },
      { name: 'Corregedoria', icon: 'fa fa-gavel', color: '#111' },
      {
        name: 'C.R.H.',
        icon: 'fa fa-address-card',
        alias: 'CRH',
        color: '#003fab'
      },
      { name: 'Serviço Secreto', icon: 'fa fa-user-secret', color: '#ad1818' },
      { name: 'G.A.T.E.', icon: 'fa fa-user-secret', color: '#ad1818' },
      { name: 'Diretoria', icon: 'fa fa-balance-scale', color: '#9e9e9e' },
      { name: 'Usuários', alias: 'USERS', color: '#607d8b', is_permanent: true }
    ].entries()) {
      const group = new Group();
      group.fill({ id: index + 1, ...data });
      await group.save();
    }

    console.log('Grupos criados.');
  }
}

module.exports = GroupSeeder;
