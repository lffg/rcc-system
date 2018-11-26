'use strict'

const Database = use('Database')

const Group = use('App/Models/Group')
const PositionGroup = use('App/Models/PositionGroup')
const Position = use('App/Models/Position')
const Permission = use('App/Models/Permission')
const User = use('App/Models/User')
const Notification = use('App/Models/Notification')
const RequestController = use('App/Models/RequestController')
const RequestEditLog = use('App/Models/RequestEditLog')
const RequestAction = use('App/Models/RequestAction')
const RequestReview = use('App/Models/RequestReview')
const RequestType = use('App/Models/RequestType')
const Request = use('App/Models/Request')
const Post = use('App/Models/Post')

class Init {
  async run () {
    if (!process.env.SQLITE) {
      await Database.raw('SET FOREIGN_KEY_CHECKS = 0')
    }

    await Group.truncate()
    await Database.raw('TRUNCATE TABLE pivot_group_user')
    await PositionGroup.truncate()
    await Position.truncate()
    await Permission.truncate()
    await Database.raw('TRUNCATE TABLE pivot_group_permission')
    await User.truncate()
    await Notification.truncate()
    await RequestController.truncate()
    await RequestEditLog.truncate()
    await RequestAction.truncate()
    await RequestReview.truncate()
    await RequestType.truncate()
    await Request.truncate()
    await Database.raw('TRUNCATE TABLE pivot_request_action_type')
    await Post.truncate()

    if (!process.env.SQLITE) {
      await Database.raw('SET FOREIGN_KEY_CHECKS = 1')
    }

    console.log('Tabelas resetadas.')
  }
}

module.exports = Init
