'use strict'

const Notification = use('App/Models/Notification')
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    await this.createNotifications()
    console.log('Notificações de teste criadas.')
  }

  async createNotifications () {
    const { luiz } = await this._getUsers()

    for (let i = 1; i <= 5; i++) {
      const notification = new Notification()
      notification.title = `Notificação Teste ${i}`
      notification.description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dui ut leo imperdiet finibus. Aliquam sit amet hendrerit enim, id laoreet sem. Nam sapien ex, placerat id commodo eget, congue vel metus. Vestibulum at ex diam. Cras ultrices leo quis nisl iaculis porta. Etiam luctus imperdiet nisi, a dictum nunc iaculis blandit. Suspendisse luctus lobortis fringilla. Integer mattis leo at lorem elementum, ut semper purus egestas. Nam ullamcorper mollis fringilla.`

      if (i % 2 === 0) notification.action_uri = '/users'

      await luiz.notifications().save(notification)
    }
  }

  async _getUsers () {
    return {
      luiz: await User.findByOrFail('username', 'luuuiiiz.'),
      dean: await User.findByOrFail('username', 'Dean.Santos')
    }
  }
}

module.exports = UserSeeder
