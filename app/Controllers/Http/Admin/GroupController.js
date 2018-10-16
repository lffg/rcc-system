'use strict'

const icons = require('fa-icon-list')(false).map((icon) => ([
  `<div class="sys-select-item" data-text="fa fa-${icon}">`,
  `<i class="fa fa-${icon}"></i>&nbsp;fa fa-${icon}`,
  '</div>'
].join(''))).join('')

const { HttpException } = use('@adonisjs/generic-exceptions')
const Group = use('App/Models/Group')
const User = use('App/Models/User')
const Database = use('Database')
const Log = use('Log')

class GroupController {
  /**
   * Shows all the groups
   *
   * @method GET
   * @param  {object} ctx.view
   */
  async index ({ view }) {
    const groups = await Group.query()
      .sortByOrder()
      .with('users', (builder) => builder.select('id'))
      .fetch()

    return view.render('admin.groups.index', { groups: groups.toJSON() })
  }

  /**
   * Show the page to create a new group.
   *
   * @method GET
   * @param  {object} ctx.view
   */
  create ({ view }) {
    return view.render('admin.groups.create', { icons })
  }

  /**
   * Creates a new group.
   *
   * @method POST
   * @param  {object} ctx.request
   * @param  {object} ctx.response
   * @param  {object} ctx.session
   */
  async store ({ request, response, session }) {
    const data = request.only(['name', 'color', 'icon', 'description'])

    const group = new Group()
    group.fill(data)
    await group.save()

    session.flash({ success: `Grupo ${group.name} criado com sucesso!` })
    return response.route('admin:groups.show', { id: group.id })
  }

  /**
   * Shows a group.
   *
   * @method GET
   * @param  {string} ctx.params.id
   * @param  {object} ctx.view
   */
  async show ({ params: { id }, view }) {
    const group = await Group.query()
      .where({ id })
      .with('users', (builder) => builder.select('id', 'username').limit(10))
      .first()

    if (!group) throw new HttpException(`Grupo inexistente para ID ${id}.`, 404)

    const moderators = await Group.query()
      .where({ id })
      .with('users', (builder) => builder.wherePivot('is_moderator', true).select('id', 'username'))
      .first()
      .then((moderator) => moderator.toJSON().users)

    return view.render('admin.groups.show', {
      group: group.toJSON(),
      moderators,
      icons
    })
  }

  /**
   * Updates a group.
   *
   * @method POST
   * @param  {object} ctx.request
   * @param  {object} ctx.response
   * @param  {string} ctx.params.id
   * @param  {object} ctx.session
   * @param  {object} ctx.auth
   */
  async update ({ request, response, params: { id }, session, auth }) {
    const data = request.only(['name', 'color', 'icon', 'description', 'is_hidden'])
    const group = await Group.findOrFail(id)

    group.merge(data)
    await group.save()

    await Log.log(auth.user.id, request.ip(), {
      message: `Modificou os dados do grupo ${group.name}`
    })

    session.flash({ success: 'Dados do grupo alterados com sucesso.' })
    return response.redirect('back')
  }

  /**
   * Shows the page to delete a group.
   *
   * @method GET
   * @param  {string} ctx.params.id
   * @param  {object} ctx.view
   */
  async delete ({ params: { id }, view }) {
    const group = await Group.findOrFail(id)

    return view.render('admin.groups.delete', { group: group.toJSON() })
  }

  /**
   * Deletes a group.
   *
   * @method POST
   * @param  {object} ctx.request
   * @param  {object} ctx.response
   * @param  {string} ctx.params.id
   * @param  {object} ctx.session
   * @param  {object} ctx.auth
   */
  async destroy ({ request, response, params: { id }, session, auth }) {
    if (request.input('group') !== id) {
      throw new HttpException('Requisição inválida.', 400)
    }

    const group = await Group.findOrFail(id)

    if (group.is_permanent) {
      throw new HttpException(`Não é possível deletar o grupo (permanente) de ID ${id}.`, 403)
    }

    await Log.log(auth.user.id, request.ip(), {
      message: `Excluiu o grupo ${group.name}`
    })

    session.flash({ success: `Grupo ${group.name} excluído com sucesso.` })
    await group.delete()
    return response.route('admin:groups.index')
  }

  /**
   * Changes the order of a group.
   *
   * @method GET
   * @param  {object} ctx.response
   * @param  {string} ctx.params.mode
   * @param  {string} ctx.params.id
   * @param  {object} ctx.session
   */
  async order ({ response, params: { mode, id }, session }) {
    const txr = await Database.beginTransaction()

    const primaryGroup = await Group.findOrFail(id)

    const primaryOrder = primaryGroup.order
    const secondaryOrder = mode === 'up'
      ? Number(primaryOrder) - 1
      : Number(primaryOrder) + 1

    const secondaryGroupId = await Group.query()
      .where('order', secondaryOrder)
      .whereNot('id', primaryGroup.id)
      .select('id')
      .first()

    if (!secondaryGroupId) {
      session.flash({ danger: 'Erro. O segundo grupo não foi encontrado.' })
      return response.redirect('back')
    }

    const secondaryGroup = await Group.findOrFail(secondaryGroupId.id)

    primaryGroup.order =  secondaryOrder
    secondaryGroup.order = primaryOrder
    await primaryGroup.save(txr)
    await secondaryGroup.save(txr)

    txr.commit()

    session.flash({ success: 'Ordem dos grupos alteradas com sucesso!' })
    return response.redirect('back')
  }

  /**
   * Adds a new user to a group.
   *
   * @method POST
   * @param  {object} ctx.request
   * @param  {object} ctx.response
   * @param  {string} ctx.params.id
   * @param  {object} ctx.session
   * @param  {object} ctx.auth
   */
  async addUser ({ request, response, params: { id }, session, auth }) {
    const username = request.input('username', '')

    const group = await Group.findOrFail(id)
    const user = await User.findByOrFail('username', username)
    await user.groups().attach([group.id], (row) => {
      if (request.input('is_moderator', '0') === '1') {
        row.is_moderator = true
      }
    })

    await Log.log(auth.user.id, request.ip(), {
      message: `Adicionou o usuário ${user.username} ao grupo ${group.name}`
    })

    session.flash({ success: `Usuário ${user.username} adicionado ao grupo ${group.name} com sucesso.` })
    return response.redirect('back')
  }

  /**
   * Removes an user from a group.
   *
   * @method POST
   * @param  {object} ctx.request
   * @param  {object} ctx.response
   * @param  {string} ctx.params.id
   * @param  {object} ctx.session
   * @param  {object} ctx.auth
   */
  async removeUser ({ request, response, params: { id }, session, auth }) {
    const username = request.input('username', '')

    const group = await Group.findOrFail(id)
    const user = await User.findByOrFail('username', username)
    await user.groups().detach([group.id])

    await Log.log(auth.user.id, request.ip(), {
      message: `Removeu o usuário ${user.username} do grupo ${group.name}`
    })

    session.flash({ success: `Usuário ${user.username} removido do grupo ${group.name} com sucesso.` })
    return response.redirect('back')
  }

  /**
   * Adds an user to the role of moderator of a group.
   *
   * @method POST
   * @param  {object} ctx.request
   * @param  {object} ctx.response
   * @param  {string} ctx.params.id
   * @param  {object} ctx.session
   * @param  {object} ctx.auth
   */
  async addModerator ({ request, response, params: { id }, session, auth }) {
    const username = request.input('username', '')

    const group = await Group.findOrFail(id)
    const user = await User.findByOrFail('username', username)

    await user.groups().detach([group.id])
    await user.groups().attach([group.id], (row) => {
      row.is_moderator = true
    })

    await Log.log(auth.user.id, request.ip(), {
      message: `Transformou o usuário ${user.username} em moderador do grupo ${group.name}`
    })

    session.flash({ success: `Usuário ${user.username} adicionado à moderação do grupo ${group.name}.` })
    return response.redirect('back')
  }

  /**
   * Removes an user from the role of moderator of a group.
   *
   * @method POST
   * @param  {object} ctx.request
   * @param  {object} ctx.response
   * @param  {string} ctx.params.id
   * @param  {object} ctx.session
   * @param  {object} ctx.auth
   */
  async removeModerator ({ request, response, params: { id }, session, auth }) {
    const username = request.input('username', '')

    const group = await Group.findOrFail(id)
    const user = await User.findByOrFail('username', username)

    await user.groups().detach([group.id])
    await user.groups().attach([group.id], (row) => {
      row.is_moderator = false
    })

    await Log.log(auth.user.id, request.ip(), {
      message: `Removeu o usuário ${user.username} da moderação do grupo ${group.name}`
    })

    session.flash({ success: `Usuário ${user.username} removido da moderação do grupo ${group.name}.` })
    return response.redirect('back')
  }
}

module.exports = GroupController
