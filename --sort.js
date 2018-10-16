const positionsList = [
  {
    'id': 1,
    'prev_position_id': 1,
    'next_position_id': 2,
    'equivalent_to_id': 1,
    'group_id': 1,
    'alias': 'REC',
    'is_permanent': 1,
    'name': 'Recruta',
    'salary': 0,
    'officer': 0,
    'color': '#555555',
    'created_at': '2018-09-02 14:08:54',
    'updated_at': '2018-09-02 14:08:54',
    'equivalence': {
      'id': 1,
      'name': 'Recruta'
    }
  },
  {
    'id': 2,
    'prev_position_id': 1,
    'next_position_id': 3,
    'equivalent_to_id': 2,
    'group_id': 1,
    'alias': 'SLD',
    'is_permanent': 0,
    'name': 'Soldado',
    'salary': 1,
    'officer': 0,
    'color': '#8e6151',
    'created_at': '2018-09-02 14:08:54',
    'updated_at': '2018-09-02 14:08:54',
    'equivalence': {
      'id': 2,
      'name': 'Soldado'
    }
  },
  {
    'id': 3,
    'prev_position_id': 2,
    'next_position_id': 4,
    'equivalent_to_id': 3,
    'group_id': 1,
    'alias': 'CAB',
    'is_permanent': 0,
    'name': 'Cabo',
    'salary': 2,
    'officer': 0,
    'color': '#fae6ab',
    'created_at': '2018-09-02 14:08:54',
    'updated_at': '2018-09-02 14:08:54',
    'equivalence': {
      'id': 3,
      'name': 'Cabo'
    }
  },
  {
    'id': 4,
    'prev_position_id': 3,
    'next_position_id': 5,
    'equivalent_to_id': 4,
    'group_id': 1,
    'alias': 'SGT',
    'is_permanent': 0,
    'name': 'Sargento',
    'salary': 3,
    'officer': 0,
    'color': '#9e9e9e',
    'created_at': '2018-09-02 14:08:54',
    'updated_at': '2018-09-02 14:08:54',
    'equivalence': {
      'id': 4,
      'name': 'Sargento'
    }
  },
  {
    'id': 5,
    'prev_position_id': 4,
    'next_position_id': 6,
    'equivalent_to_id': 5,
    'group_id': 1,
    'alias': 'SBT',
    'is_permanent': 0,
    'name': 'Subtenente',
    'salary': 4,
    'officer': 0,
    'color': '#3f51b5',
    'created_at': '2018-09-02 14:08:54',
    'updated_at': '2018-09-02 14:08:54',
    'equivalence': {
      'id': 5,
      'name': 'Subtenente'
    }
  },
  {
    'id': 6,
    'prev_position_id': 5,
    'next_position_id': 7,
    'equivalent_to_id': 6,
    'group_id': 1,
    'alias': 'ASP',
    'is_permanent': 0,
    'name': 'Aspirante a Oficial',
    'salary': 5,
    'officer': 0,
    'color': '#43a2d3',
    'created_at': '2018-09-02 14:08:54',
    'updated_at': '2018-09-02 14:08:54',
    'equivalence': {
      'id': 6,
      'name': 'Aspirante a Oficial'
    }
  },
  {
    'id': 7,
    'prev_position_id': 6,
    'next_position_id': 8,
    'equivalent_to_id': 7,
    'group_id': 1,
    'alias': 'TEN',
    'is_permanent': 0,
    'name': 'Tenente',
    'salary': 6,
    'officer': 1,
    'color': '#ff9800',
    'created_at': '2018-09-02 14:08:54',
    'updated_at': '2018-09-02 14:08:54',
    'equivalence': {
      'id': 7,
      'name': 'Tenente'
    }
  },
  {
    'id': 8,
    'prev_position_id': 7,
    'next_position_id': 9,
    'equivalent_to_id': 8,
    'group_id': 1,
    'alias': 'CAP',
    'is_permanent': 0,
    'name': 'Capitão',
    'salary': 7,
    'officer': 1,
    'color': '#930808',
    'created_at': '2018-09-02 14:08:54',
    'updated_at': '2018-09-02 14:08:54',
    'equivalence': {
      'id': 8,
      'name': 'Capitão'
    }
  },
  {
    'id': 9,
    'prev_position_id': 8,
    'next_position_id': 10,
    'equivalent_to_id': 9,
    'group_id': 1,
    'alias': 'CEL',
    'is_permanent': 0,
    'name': 'Coronel',
    'salary': 8,
    'officer': 1,
    'color': '#8039c2',
    'created_at': '2018-09-02 14:08:54',
    'updated_at': '2018-09-02 14:08:54',
    'equivalence': {
      'id': 9,
      'name': 'Coronel'
    }
  },
  {
    'id': 10,
    'prev_position_id': 9,
    'next_position_id': 11,
    'equivalent_to_id': 10,
    'group_id': 1,
    'alias': 'GEN',
    'is_permanent': 0,
    'name': 'General',
    'salary': 9,
    'officer': 1,
    'color': '#4a8100',
    'created_at': '2018-09-02 14:08:55',
    'updated_at': '2018-09-02 14:08:55',
    'equivalence': {
      'id': 10,
      'name': 'General'
    }
  },
  {
    'id': 11,
    'prev_position_id': 10,
    'next_position_id': 12,
    'equivalent_to_id': 11,
    'group_id': 1,
    'alias': 'MAL',
    'is_permanent': 0,
    'name': 'Marechal',
    'salary': 10,
    'officer': 1,
    'color': '#d7b400',
    'created_at': '2018-09-02 14:08:55',
    'updated_at': '2018-09-02 14:08:55',
    'equivalence': {
      'id': 11,
      'name': 'Marechal'
    }
  },
  {
    'id': 12,
    'prev_position_id': 11,
    'next_position_id': 13,
    'equivalent_to_id': 12,
    'group_id': 1,
    'alias': 'CMT',
    'is_permanent': 0,
    'name': 'Comandante',
    'salary': 11,
    'officer': 1,
    'color': '#506975',
    'created_at': '2018-09-02 14:08:55',
    'updated_at': '2018-09-02 14:08:55',
    'equivalence': {
      'id': 12,
      'name': 'Comandante'
    }
  },
  {
    'id': 13,
    'prev_position_id': 12,
    'next_position_id': 13,
    'equivalent_to_id': 13,
    'group_id': 1,
    'alias': 'CGR',
    'is_permanent': 0,
    'name': 'Comandante-geral',
    'salary': 12,
    'officer': 1,
    'color': '#506975',
    'created_at': '2018-09-02 14:08:55',
    'updated_at': '2018-09-02 14:08:55',
    'equivalence': {
      'id': 13,
      'name': 'Comandante-geral'
    }
  }
]

function sortPositions (positions) {
  const firstIndex = positions.findIndex(({ id, prev_position_id: prev }) => id === prev)
  const sortedPositions = []

  for (let current = positions[firstIndex]; ;) {
    sortedPositions.push(current)
    current = positions.find(({ id }) => id === current.next_position_id)

    if (typeof current === 'undefined') break

    if (current.id === current.next_position_id) {
      sortedPositions.push(current)
      break
    }
  }

  return sortedPositions
}

console.log(sortPositions(positionsList))
