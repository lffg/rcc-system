const { pick, omit } = require('lodash');
const { positions, positionGroups } = require('../seeds-data/positions');

const PositionGroup = use('App/Models/PositionGroup');
const Position = use('App/Models/Position');

class PositionSeeder {
  SELF_RELATION_KEYS = [
    'prev_position_id',
    'next_position_id',
    'equivalent_to_id'
  ];

  async run() {
    await this.createPositionGroups();
    await this.createPositions();
  }

  async createPositionGroups() {
    await Promise.all(
      positionGroups.map(async (positionGroup) => {
        const group = new PositionGroup();
        group.merge(positionGroup);
        await group.save();
      })
    );
    console.log('Grupos de posições criados.');
  }

  async createPositions() {
    const positionsWithRelationMap = await Promise.all(
      positions
        .map((positionWithType) => this.setGroupId(positionWithType))
        .map(async (positionData) => [
          await this.createPosition(
            omit(positionData, this.SELF_RELATION_KEYS)
          ),
          pick(positionData, this.SELF_RELATION_KEYS)
        ])
    );
    console.log('Posições criadas.');

    await Promise.all(
      positionsWithRelationMap.map(async ([position, relationData]) => {
        position.merge(relationData);
        await position.save();
      })
    );
    console.log('Relações Posição <-> Posição estabelecidas.');
  }

  setGroupId({ type, ...position }) {
    const group = (id) => ({ ...position, group_id: id });

    switch (type) {
      case 'CM':
        return group(1);
      case 'CE':
        return group(2);
      case 'EXTRA':
        return group(3);
      default:
        throw new Error('Tipo de posição não existente.');
    }
  }

  async createPosition(positionData) {
    const position = new Position();
    position.merge(positionData);
    await position.save();
    return position;
  }
}

module.exports = PositionSeeder;
