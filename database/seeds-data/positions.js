exports.positionGroups = [
  {
    id: 1,
    name: 'Corpo Militar',
    description: 'Patentes do Corpo Militar.',
    alias: 'CM',
    is_permanent: true
  },
  {
    id: 2,
    name: 'Corpo Executivo',
    description: 'Cargos do Corpo Executivo.',
    alias: 'CE',
    is_permanent: true
  },
  {
    id: 3,
    name: 'Outros',
    description: 'Cargos diversos.',
    alias: 'EXTRA',
    is_permanent: true
  }
];

exports.positions = [
  {
    id: 2,
    order: 1,
    name: 'Soldado',
    alias: 'SLD',
    prev_position_id: 1,
    next_position_id: 3,
    equivalent_to_id: 2,
    is_permanent: true,
    salary: 1,
    officer: false,
    type: 'CM',
    color: '#80584a'
  },
  {
    id: 3,
    order: 2,
    name: 'Cabo',
    alias: 'CAB',
    prev_position_id: 2,
    next_position_id: 4,
    equivalent_to_id: 3,
    is_permanent: false,
    salary: 2,
    officer: false,
    type: 'CM',
    color: '#ddd59d'
  },
  {
    id: 4,
    order: 3,
    name: 'Sargento',
    alias: 'SGT',
    prev_position_id: 3,
    next_position_id: 5,
    equivalent_to_id: 4,
    is_permanent: false,
    salary: 3,
    officer: false,
    type: 'CM',
    color: '#cecece'
  },
  {
    id: 5,
    order: 4,
    name: 'Subtenente',
    alias: 'SBT',
    prev_position_id: 4,
    next_position_id: 6,
    equivalent_to_id: 5,
    is_permanent: false,
    salary: 4,
    officer: false,
    type: 'CM',
    color: '#3f51b5'
  },
  {
    id: 6,
    order: 5,
    name: 'Aspirante a Oficial',
    alias: 'ASP',
    prev_position_id: 5,
    next_position_id: 7,
    equivalent_to_id: 6,
    is_permanent: false,
    salary: 5,
    officer: false,
    type: 'CM',
    color: '#17b5dd'
  },
  {
    id: 7,
    order: 6,
    name: 'Tenente',
    alias: 'TEN',
    prev_position_id: 6,
    next_position_id: 8,
    equivalent_to_id: 7,
    is_permanent: false,
    salary: 6,
    officer: true,
    type: 'CM',
    color: '#ff9800'
  },
  {
    id: 8,
    order: 7,
    name: 'Capitão',
    alias: 'CAP',
    prev_position_id: 7,
    next_position_id: 9,
    equivalent_to_id: 8,
    is_permanent: false,
    salary: 7,
    officer: true,
    type: 'CM',
    color: '#9a001c'
  },
  {
    id: 9,
    order: 8,
    name: 'Coronel',
    alias: 'CEL',
    prev_position_id: 8,
    next_position_id: 10,
    equivalent_to_id: 9,
    is_permanent: false,
    salary: 8,
    officer: true,
    type: 'CM',
    color: '#58319e'
  },
  {
    id: 10,
    order: 9,
    name: 'General',
    alias: 'GEN',
    prev_position_id: 9,
    next_position_id: 11,
    equivalent_to_id: 10,
    is_permanent: false,
    salary: 9,
    officer: true,
    type: 'CM',
    color: '#3d6704'
  },
  {
    id: 11,
    order: 10,
    name: 'Marechal',
    alias: 'MAL',
    prev_position_id: 10,
    next_position_id: 12,
    equivalent_to_id: 11,
    is_permanent: false,
    salary: 10,
    officer: true,
    type: 'CM',
    color: '#fee407'
  },
  {
    id: 12,
    order: 11,
    name: 'Comandante',
    alias: 'CMT',
    prev_position_id: 11,
    next_position_id: 13,
    equivalent_to_id: 12,
    is_permanent: false,
    salary: 11,
    officer: true,
    type: 'CM',
    color: '#000000'
  },
  {
    id: 13,
    order: 12,
    name: 'Comandante-geral',
    alias: 'CGR',
    prev_position_id: 12,
    next_position_id: 38,
    equivalent_to_id: 13,
    is_permanent: false,
    salary: 12,
    officer: true,
    type: 'CM',
    color: '#000000'
  },
  {
    id: 14,
    order: 1,
    name: 'Agente',
    alias: 'AGT',
    prev_position_id: 1,
    next_position_id: 15,
    equivalent_to_id: 2,
    is_permanent: false,
    salary: 1,
    officer: false,
    type: 'CE',
    color: '#80584a'
  },
  {
    id: 15,
    order: 2,
    name: 'Sócio',
    alias: 'SOC',
    prev_position_id: 14,
    next_position_id: 16,
    equivalent_to_id: 2,
    is_permanent: false,
    salary: 1,
    officer: false,
    type: 'CE',
    color: '#80584a'
  },
  {
    id: 16,
    order: 3,
    name: 'Inspetor',
    alias: 'IPR',
    prev_position_id: 15,
    next_position_id: 17,
    equivalent_to_id: 3,
    is_permanent: false,
    salary: 2,
    officer: false,
    type: 'CE',
    color: '#ddd59d'
  },
  {
    id: 17,
    order: 4,
    name: 'Inspetor Geral',
    alias: 'IPG',
    prev_position_id: 16,
    next_position_id: 18,
    equivalent_to_id: 3,
    is_permanent: false,
    salary: 2,
    officer: false,
    type: 'CE',
    color: '#ddd59d'
  },
  {
    id: 18,
    order: 5,
    name: 'Advogado',
    alias: 'ADV',
    prev_position_id: 17,
    next_position_id: 19,
    equivalent_to_id: 4,
    is_permanent: false,
    salary: 3,
    officer: false,
    type: 'CE',
    color: '#cecece'
  },
  {
    id: 19,
    order: 6,
    name: 'Subdiretor',
    alias: 'SDT',
    prev_position_id: 18,
    next_position_id: 20,
    equivalent_to_id: 4,
    is_permanent: false,
    salary: 3,
    officer: false,
    type: 'CE',
    color: '#cecece'
  },
  {
    id: 20,
    order: 7,
    name: 'Diretor',
    alias: 'DIR',
    prev_position_id: 19,
    next_position_id: 21,
    equivalent_to_id: 5,
    is_permanent: false,
    salary: 4,
    officer: false,
    type: 'CE',
    color: '#3f51b5'
  },
  {
    id: 21,
    order: 8,
    name: 'Diretor Geral',
    alias: 'DGE',
    prev_position_id: 20,
    next_position_id: 22,
    equivalent_to_id: 5,
    is_permanent: false,
    salary: 4,
    officer: false,
    type: 'CE',
    color: '#3f51b5'
  },
  {
    id: 22,
    order: 9,
    name: 'Supervisor',
    alias: 'SUP',
    prev_position_id: 21,
    next_position_id: 23,
    equivalent_to_id: 6,
    is_permanent: false,
    salary: 5,
    officer: false,
    type: 'CE',
    color: '#17b5dd'
  },
  {
    id: 23,
    order: 10,
    name: 'Supervisor Geral',
    alias: 'SGE',
    prev_position_id: 22,
    next_position_id: 24,
    equivalent_to_id: 6,
    is_permanent: false,
    salary: 5,
    officer: false,
    type: 'CE',
    color: '#17b5dd'
  },
  {
    id: 24,
    order: 11,
    name: 'Coordenador',
    alias: 'CRD',
    prev_position_id: 23,
    next_position_id: 25,
    equivalent_to_id: 7,
    is_permanent: false,
    salary: 6,
    officer: true,
    type: 'CE',
    color: '#ff9800'
  },
  {
    id: 25,
    order: 12,
    name: 'Coordenador Geral',
    alias: 'CGE',
    prev_position_id: 24,
    next_position_id: 26,
    equivalent_to_id: 7,
    is_permanent: false,
    salary: 6,
    officer: true,
    type: 'CE',
    color: '#ff9800'
  },
  {
    id: 26,
    order: 13,
    name: 'Ministro',
    alias: 'MIN',
    prev_position_id: 25,
    next_position_id: 27,
    equivalent_to_id: 8,
    is_permanent: false,
    salary: 7,
    officer: true,
    type: 'CE',
    color: '#9a001c'
  },
  {
    id: 27,
    order: 14,
    name: 'Ministro Geral',
    alias: 'MGR',
    prev_position_id: 26,
    next_position_id: 28,
    equivalent_to_id: 8,
    is_permanent: false,
    salary: 7,
    officer: true,
    type: 'CE',
    color: '#9a001c'
  },
  {
    id: 28,
    order: 15,
    name: 'Vice-presidente',
    alias: 'VPR',
    prev_position_id: 27,
    next_position_id: 29,
    equivalent_to_id: 9,
    is_permanent: false,
    salary: 8,
    officer: true,
    type: 'CE',
    color: '#58319e'
  },
  {
    id: 29,
    order: 16,
    name: 'Vice-presidente Geral',
    alias: 'VPG',
    prev_position_id: 28,
    next_position_id: 30,
    equivalent_to_id: 9,
    is_permanent: false,
    salary: 8,
    officer: true,
    type: 'CE',
    color: '#58319e'
  },
  {
    id: 30,
    order: 17,
    name: 'Conselheiro',
    alias: 'CON',
    prev_position_id: 29,
    next_position_id: 31,
    equivalent_to_id: 10,
    is_permanent: false,
    salary: 9,
    officer: true,
    type: 'CE',
    color: '#3d6704'
  },
  {
    id: 31,
    order: 18,
    name: 'Orientador',
    alias: 'ORN',
    prev_position_id: 30,
    next_position_id: 32,
    equivalent_to_id: 10,
    is_permanent: false,
    salary: 9,
    officer: true,
    type: 'CE',
    color: '#3d6704'
  },
  {
    id: 32,
    order: 19,
    name: 'VIP',
    alias: 'VIP',
    prev_position_id: 31,
    next_position_id: 33,
    equivalent_to_id: 11,
    is_permanent: false,
    salary: 10,
    officer: true,
    type: 'CE',
    color: '#fee407'
  },
  {
    id: 33,
    order: 20,
    name: 'Executive',
    alias: 'EXC',
    prev_position_id: 32,
    next_position_id: 34,
    equivalent_to_id: 11,
    is_permanent: false,
    salary: 10,
    officer: true,
    type: 'CE',
    color: '#fee407'
  },
  {
    id: 34,
    order: 21,
    name: 'Presidente',
    alias: 'PRE',
    prev_position_id: 33,
    next_position_id: 35,
    equivalent_to_id: 12,
    is_permanent: false,
    salary: 11,
    officer: true,
    type: 'CE',
    color: '#000000'
  },
  {
    id: 35,
    order: 22,
    name: 'Acionista Majoritário',
    alias: 'ACM',
    prev_position_id: 34,
    next_position_id: 36,
    equivalent_to_id: 12,
    is_permanent: false,
    salary: 11,
    officer: true,
    type: 'CE',
    color: '#000000'
  },
  {
    id: 36,
    order: 23,
    name: 'Chanceler',
    alias: 'CLR',
    prev_position_id: 35,
    next_position_id: 38,
    equivalent_to_id: 13,
    is_permanent: false,
    salary: 12,
    officer: true,
    type: 'CE',
    color: '#000000'
  },
  {
    id: 1,
    order: 1,
    name: 'Recruta',
    alias: 'REC',
    prev_position_id: 1,
    next_position_id: 1,
    equivalent_to_id: 1,
    is_permanent: true,
    salary: 0,
    officer: false,
    type: 'EXTRA',
    color: '#555555'
  },
  {
    id: 37,
    order: 2,
    name: 'Desenvolvedor',
    alias: 'DEV',
    prev_position_id: 37,
    next_position_id: 37,
    equivalent_to_id: 37,
    is_permanent: true,
    salary: 0,
    officer: true,
    type: 'EXTRA',
    color: '#000000',
    is_available_to_crh: false
  },
  {
    id: 38,
    order: 3,
    name: 'Comandante Supremo',
    alias: 'SUPR',
    prev_position_id: 38,
    next_position_id: 38,
    equivalent_to_id: 38,
    is_permanent: true,
    salary: 0,
    officer: true,
    type: 'EXTRA',
    color: '#000000',
    is_available_to_crh: false
  }
];
