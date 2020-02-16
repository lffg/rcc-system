const usernames = [
  'Strog-BAN',
  'Vacita',
  '@Jhoey@Ban@',
  ',SrGabriel',
  '@WooD',
  '.Rosemary.',
  'vascsjr.ban',
  'Goufix',
  'maik@taian'
].map((username, index) => ({
  id: index + 4,
  username,
  tag: `Te${index + 1}`,
  email: `${username}sys@test.com`,
  state: 'ACTIVE',
  password: 'sys-123',
  is_verified_email: true,
  promoter_id: 1,
  position_id: 5
}));

const users = [
  {
    id: 1,
    username: 'luuuiiiz.',
    state: 'ACTIVE',
    tag: 'LUI',
    password: '123',
    email: 'luiz@rccsystem.com',
    is_verified_email: true,
    temporary_bonuses: 254,
    promoter_id: 2,
    position_id: 37,
    __groups__: ['ADMIN', 'DEV']
  },
  {
    id: 2,
    username: 'Dean.Santos',
    state: 'ACTIVE',
    tag: 'DsT',
    password: '123',
    email: 'dean@rccsystem.com',
    position_id: 38,
    __groups__: ['ADMIN', 'DEV', 'CRH']
  },
  {
    id: 3,
    username: 'Zaswes',
    state: 'ACTIVE',
    tag: 'Zas',
    password: '123',
    email: 'zas@rccsystem.com',
    position_id: 37
  }
];

exports.users = [...users, ...usernames];
