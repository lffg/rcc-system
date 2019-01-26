'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions')
const Group = use('App/Models/Group')
const User = use('App/Models/User')
const Log = use('Log')

class GroupController {
  /**
   * Mostra todos os grupos.
   *
   * @method GET
   */
  async index ({ view }) {
    const groups = await Group.query()
      .sortByOrder()
      .withCount('users')
      .fetch()

    return view.render('pages.groups.index', { groups: groups.toJSON() })
  }

  /**
   * Mostra os detalhes de um grupo específico.
   *
   * @method GET
   */
  async show ({ params: { id }, view, auth }) {
    const group = await Group.query()
      .where({ id })
      .withCount('users')
      .with('users', (builder) => {
        builder
          .select('id', 'username')
          .with('groups', (builder) => builder.select('id', 'icon', 'color').sortByOrder())
      })
      .firstOrFail()

    if (group.is_hidden && !(await auth.user.isModerator(id) || await auth.user.hasPermission('ADMIN', true))) {
      throw new HttpException('Acesso negado.', 403)
    }

    const moderators = await Group.query()
      .where({ id })
      .with('users', (builder) => builder.select('id', 'username').wherePivot('is_moderator', true))
      .first()
      .then((group) => group.toJSON().users)

    return view.render('pages.groups.show', { moderators, group: group.toJSON() })
  }

  /**
   * Adiciona um usuário para um grupo.
   *
   * @method  POST
   */
  async addUser ({ request, response, params: { id }, session, auth }) {
    const username = request.input('username', '')

    const group = await Group.findOrFail(id)
    const user = await User.findByOrFail('username', username)
    await user.groups().attach([group.id])

    await Log.log(auth.user.id, request.ip(), {
      message: `[MOD Grupo] Adicionou o usuário ${user.username} ao grupo ${group.name}`
    })

    session.flash({ success: `Usuário ${user.username} adicionado ao grupo ${group.name} com sucesso.` })
    return response.redirect('back')
  }

  /**
   * Remove um usuário de um grupo.
   *
   * @method POST
   */
  async removeUser ({ request, response, params: { id }, session, auth }) {
    const username = request.input('username', '')

    const group = await Group.findOrFail(id)
    const user = await User.findByOrFail('username', username)
    await user.groups().detach([group.id])

    await Log.log(auth.user.id, request.ip(), {
      message: `[MOD Grupo] Removeu o usuário ${user.username} do grupo ${group.name}`
    })

    session.flash({ success: `Usuário ${user.username} removido do grupo ${group.name} com sucesso.` })
    return response.redirect('back')
  }
}

module.exports = GroupController
