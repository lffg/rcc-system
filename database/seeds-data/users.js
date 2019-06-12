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
  username,
  tag: `Te${index + 1}`,
  email: `${username}sys@test.com`,
  state: 'ACTIVE',
  password: 'sys-123',
  is_verified_email: true,
  promoter_id: 2,
  position_id: 37
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
    position_id: 37
  },
  {
    id: 2,
    username: 'Dean.Santos',
    state: 'ACTIVE',
    tag: 'DsT',
    password: '123',
    email: 'dean@rccsystem.com',
    position_id: 37 // 38 = C. Supr.
  }
];

exports.users = [...users, ...usernames];
