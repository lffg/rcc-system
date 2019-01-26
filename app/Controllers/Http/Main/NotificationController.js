'use strict'

const Notification = use('App/Models/Notification')

class NotificationController {
  /**
   * Mostra uma lista com as notificações.
   *
   * @method GET
   */
  async list({ params: { userId = null }, view }) {
    const notifications = await Notification.query()
      .where({ user_id: userId, is_read: false })
      .limit(12)
      .orderBy('created_at', 'desc')
      .fetch()
      .then((notifications) => notifications.toJSON())

    return view.render('pages.session.notifications.list', { notifications })
  }
}

module.exports = NotificationController
