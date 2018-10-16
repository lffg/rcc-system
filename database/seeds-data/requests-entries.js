module.exports = [
  {
    controller_id: 1,
    type_id: 1,
    is_reviewable: true,
    crh_state: 'PENDING',
    author_id: 2,
    receiver_id: 11
  },
  {
    controller_id: 2,
    type_id: 2,
    is_reviewable: true,
    crh_state: 'APPROVED',
    author_id: 4,
    receiver_id: 3,
    before_position_id: 5,
    after_position_id: 6,
    reason: 'Excelente.'
  },
  {
    controller_id: 2,
    type_id: 3,
    is_reviewable: true,
    crh_state: 'PENDING',
    author_id: 2,
    receiver_id: 3,
    before_position_id: 6,
    after_position_id: 5,
    reason: 'Mau comportamento.'
  },
  {
    controller_id: 3,
    type_id: 6,
    is_reviewable: true,
    crh_state: 'PENDING',
    author_id: 2,
    receiver_id: 4,
    before_position_id: 13,
    after_position_id: 12,
    reason: 'Mau comportamento (Reb de surf).'
  },
  {
    controller_id: 4,
    type_id: 11,
    is_reviewable: true,
    crh_state: 'APPROVED',
    author_id: 2,
    receiver_id: 10,
    before_position_id: 1,
    after_position_id: 32,
    price: '1k'
  },
  {
    controller_id: 4,
    type_id: 12,
    is_reviewable: true,
    crh_state: 'APPROVED',
    author_id: 2,
    receiver_id: 10,
    before_position_id: 32,
    after_position_id: 31,
    reason: 'Desacato.'
  },
  {
    controller_id: 4,
    type_id: 11,
    is_reviewable: true,
    crh_state: 'PENDING',
    author_id: 2,
    receiver_id: 10,
    before_position_id: 31,
    after_position_id: 32,
    price: '1k'
  }
]
