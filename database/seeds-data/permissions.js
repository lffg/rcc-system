const groups = {
  DEV: 1,
  ADMIN: 2,
  COR: 3,
  CRH: 4
}

exports.permissions = [
  {
    alias: 'ADMIN',
    is_permanent: true,
    name: 'Acesso à Administração do Site',
    __groups__: [groups.ADMIN, groups.DEV]
  },
  {
    alias: 'DEV',
    is_permanent: true,
    name: 'Acesso às Ferramentas de Desenvolvimento',
    __groups__: [groups.DEV]
  },
  {
    alias: 'CRH',
    is_permanent: true,
    name: 'Acesso à Gestão do Centro de Recursos Humanos',
    __groups__: [groups.ADMIN, groups.DEV, groups.COR, groups.CRH]
  }
]
