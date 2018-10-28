'use strict'

const { users } = require('../seeds-data/users')

const Position = use('App/Models/Position')
const Group = use('App/Models/Group')
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    await this.createUsers()
    console.log('Usuários criados.')

    await this.setPositions()
    console.log('Posições criadas.')

    await this.setupPromoterTags()
    console.log('Tags dos promotores setadas.')

    await this.setGroupRelations()
    console.log('Relação entre usuários e grupo criadas.')
  }

  async createUsers () {
    for (const data of users) {
      const user = new User()
      user.merge(data)
      await user.save()
    }
  }

  async setPositions () {
    const { luiz, wire, dean, surf } = await this._getUsers()
    const { supr, dev, cgr, sub } = await this._getPositions()

    await luiz.position().associate(dev)
    await wire.position().associate(sub)
    await surf.position().associate(cgr)
    await dean.position().associate(supr)
  }

  async setupPromoterTags () {
    const { luiz, wire, dean, surf } = await this._getUsers()

    luiz.promoter_id = dean.id
    await luiz.save()

    wire.promoter_id = surf.id
    await wire.save()

    surf.promoter_id = dean.id
    await surf.save()
  }

  async setGroupRelations () {
    const { luiz, dean, surf } = await this._getUsers()

    const admin = await Group.findBy('alias', 'ADMIN')
    const dev = await Group.findBy('alias', 'DEV')
    const crh = await Group.findBy('alias', 'CRH')

    const row = (row) => {
      row.is_moderator = true
    }

    await luiz.groups().attach([admin.id, dev.id], row)
    await dean.groups().attach([admin.id, dev.id, crh.id], row)
    await surf.groups().attach([admin.id, crh.id], row)
  }

  async _getUsers () {
    return {
      luiz: await User.findByOrFail('username', 'luuuiiiz.'),
      wire: await User.findByOrFail('username', '.Wire.-'),
      dean: await User.findByOrFail('username', 'Dean.Santos'),
      surf: await User.findByOrFail('username', 'surfjoseca39')
    }
  }

  async _getPositions () {
    return {
      supr: await Position.findByOrFail('alias', 'SUPR'),
      dev: await Position.findByOrFail('alias', 'DEV'),
      cgr: await Position.findByOrFail('alias', 'CGR'),
      sub: await Position.findByOrFail('alias', 'SBT')
    }
  }
}

module.exports = UserSeeder
