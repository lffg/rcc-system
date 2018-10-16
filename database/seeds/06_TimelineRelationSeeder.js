'use strict'

module.exports = class {
  async run () {}
}
/*
const Position = use('App/Models/Position')
const CrhRequest = use('App/Services/Crh')
const User = use('App/Models/User')

class TimelineRelationSeeder {
  async run () {
    const { wire, dean, surf } = await this._getUsers()
    const { rec, sld } = await this._getPositions()

    const controller_id = await CrhRequest.helpers.controller.findByAlias('REGISTRO', true)
    const approvedId = await CrhRequest.helpers.state.findByAlias('APPROVED', true)
    const type_id = await CrhRequest.helpers.type.findByAlias('PRO', true)

    const request = new CrhRequest()

    request.controller_id = controller_id
    request.crhHasReview = false
    request.type_id = type_id
    request.title = 'Promoção de Soldado para Cabo'
    request.description = `Lorem ipsum dolor sit amet quae nulla at nulla ipsum lorem dolor. :)`

    request.affectedId = wire.id
    request.affectedPositionBefore = rec.id
    request.affectedPositionAfter = sld.id
    request.author_id = dean.id
    request.crh_stateId = approvedId
    request.crhHasReview = true
    request.crhReviwerId = surf.id
    request.crhReviewDate = Date.now()

    await request.save()

    console.log('Relações de timeline criadas e estabelecidas.')
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
      rec: await Position.findByOrFail('alias', 'REC'),
      sld: await Position.findByOrFail('alias', 'SLD'),
      cab: await Position.findByOrFail('alias', 'CAB'),
      sgt: await Position.findByOrFail('alias', 'SGT')
    }
  }
}

module.exports = TimelineRelationSeeder
*/
