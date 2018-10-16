'use strict'

const { positions, groups: positionGroups } = require('../seeds-data/positions')

const PositionGroup = use('App/Models/PositionGroup')
const Position = use('App/Models/Position')
const Database = use('Database')

class PositionSeeder {
  async run () {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0')
    await PositionGroup.truncate()
    await Position.truncate()

    await this._createGroups()
    console.log('Grupos de posições criados.')

    await this._createPositions()
    console.log('Posições criadas.')

    await Database.raw('SET FOREIGN_KEY_CHECKS = 1')
  }

  async _createGroups () {
    for (const data of positionGroups) {
      const group = new PositionGroup()
      group.merge(data)
      await group.save()
    }
  }

  async _createPositions () {
    for (const data of positions) {
      switch (data.type.toUpperCase()) {
        case 'CM': data.group_id = 1; break
        case 'CE': data.group_id = 2; break
        case 'EXTRA': data.group_id = 3; break
      }

      delete data.type

      const position = new Position()
      position.merge(data)
      await position.save()
    }
  }
}

module.exports = PositionSeeder
