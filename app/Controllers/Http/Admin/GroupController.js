const icons = require('fa-icon-list')(false)
  .map((icon) =>
    [
      `<div class="sys-select-item" data-text="fa fa-${icon}">`,
      `<i class="fa fa-${icon}"></i>&nbsp;fa fa-${icon}`,
      '</div>'
    ].join('')
  )
  .join('');

const { HttpException } = use('@adonisjs/generic-exceptions');
const Group = use('App/Models/Group');
const User = use('App/Models/User');
const Database = use('Database');
const Route = use('Route');
const Log = use('Log');

class GroupController {
  /**
   * Página que mostra todos os usuários, dentro do painel de controle.
   *
   * @method GET
   */
  async index({ view }) {
    const groups = await Group.query()
      .sortByOrder()
      .with('users', (builder) => builder.select('id'))
      .fetch();

    return view.render('admin.groups.index', { groups: groups.toJSON() });
  }

  /**
   * Página que contém o formulário para criar um novo grupo.
   *
   * @method GET
   */
  create({ view }) {
    return view.render('admin.groups.create', { icons });
  }

  /**
   * Cria um novo grupo, salvando-o na base de dados.
   *
   * @method POST
   */
  async store({ request, response, session }) {
    const data = request.only(['name', 'color', 'icon', 'description']);

    const group = new Group();
    group.fill(data);
    await group.save();

    session.flash({ success: `Grupo ${group.name} criado com sucesso!` });
    return response.route('admin:groups.show', { id: group.id });
  }

  /**
   * Mostra a página com os detalhes de um grupo.
   *
   * @method GET
   */
  async show({ params: { id }, view }) {
    const group = await Group.findOrFail(id).then((group) => group.toJSON());
    return view.render('admin.groups.show', { group, icons });
  }

  async members({ request, params: { id }, view }) {
    const page = Math.abs(request.input('page', 1));

    const group = await Group.findOrFail(id);
    const users = await group
      .users()
      .select('id', 'username')
      .paginate(page, 25);
    const mods = await group
      .users()
      .wherePivot('is_moderator', true)
      .fetch();

    return view.render('admin.groups.members', {
      group: group.toJSON(),
      users: users.toJSON(),
      mods: mods.toJSON()
    });
  }

  /**
   * Atualiza as informações de um grupo.
   *
   * @method POST
   */
  async update({ request, response, params: { id }, session, auth }) {
    const data = request.only([
      'name',
      'color',
      'icon',
      'description',
      'is_hidden'
    ]);
    const group = await Group.findOrFail(id);

    group.merge(data);
    await group.save();

    await Log.log(auth.user.id, request.ip(), {
      message: `Modificou os dados do grupo ${group.name}`
    });

    session.flash({ success: 'Dados do grupo alterados com sucesso.' });
    return response.redirect('back');
  }

  /**
   * Mostra a página de confirmação para a exclusão de um grupo.
   *
   * @method GET
   */
  async delete({ params: { id }, view }) {
    const group = await Group.findOrFail(id);

    return view.render('admin.groups.delete', { group: group.toJSON() });
  }

  /**
   * Remove um grupo da base de dados.
   *
   * @method GET
   */
  async destroy({ request, response, params: { id }, session, auth }) {
    if (request.input('group') !== id) {
      throw new HttpException('Requisição inválida.', 400);
    }

    const group = await Group.findOrFail(id);

    if (group.is_permanent) {
      throw new HttpException(
        `Não é possível deletar o grupo (permanente) de ID ${id}.`,
        403
      );
    }

    await Log.log(auth.user.id, request.ip(), {
      message: `Excluiu o grupo ${group.name}`
    });

    session.flash({ success: `Grupo ${group.name} excluído com sucesso.` });
    await group.delete();
    return response.route('admin:groups.index');
  }

  /**
   * Muda a ordem de um grupo.
   *
   * @method GET
   */
  async order({ response, params: { mode, id }, session }) {
    const trx = await Database.beginTransaction();

    const primaryGroup = await Group.findOrFail(id);

    const primaryOrder = primaryGroup.order;
    const secondaryOrder =
      mode === 'up' ? Number(primaryOrder) - 1 : Number(primaryOrder) + 1;

    const secondaryGroupId = await Group.query()
      .where('order', secondaryOrder)
      .whereNot('id', primaryGroup.id)
      .select('id')
      .first();

    if (!secondaryGroupId) {
      session.flash({ danger: 'Erro. O segundo grupo não foi encontrado.' });
      return response.redirect('back');
    }

    const secondaryGroup = await Group.findOrFail(secondaryGroupId.id);

    primaryGroup.order = secondaryOrder;
    secondaryGroup.order = primaryOrder;
    await primaryGroup.save(trx);
    await secondaryGroup.save(trx);

    await trx.commit();

    session.flash({ success: 'Ordem dos grupos alteradas com sucesso!' });
    return response.redirect('back');
  }

  /**
   * Adiciona um novo usuário para um grupo.
   *
   * @method POST
   */
  async addUser({ request, response, params: { id }, session, auth }) {
    const username = request.input('username', '');

    const group = await Group.findOrFail(id);
    const user = await User.findByOrFail('username', username);
    await user.groups().attach([group.id], (row) => {
      if (request.input('is_moderator', '0') === '1') {
        row.is_moderator = true;
      }
    });

    await Log.log(auth.user.id, request.ip(), {
      message: `Adicionou o usuário ${user.username} ao grupo ${group.name}`
    });

    session.flash({
      success: `Usuário ${user.username} adicionado ao grupo ${group.name} com sucesso.`
    });
    return response.redirect('back');
  }

  /**
   * Remove um usuário de um grupo.
   *
   * @method POST
   */
  async removeUser({ request, response, params: { id }, session, auth }) {
    const users = request.collect(['username']).map(({ username }) => username);

    const group = await Group.findOrFail(id);

    for (const username of users) {
      const user = await User.findByOrFail('username', username);
      await user.groups().detach([group.id]);

      await Log.log(auth.user.id, request.ip(), {
        message: `Removeu o usuário ${user.username} do grupo ${group.name}`
      });
    }

    session.flash({
      success: `Usuário(s) "${users.join(', ')}" removido(s) do grupo ${
        group.name
      } com sucesso.`
    });
    return response.redirect('back');
  }

  /**
   * Define um usuário como moderador de um determinado grupo.
   *
   * @method POST
   */
  async addModerator({ request, response, params: { id }, session, auth }) {
    const username = request.input('username', '');

    const group = await Group.findOrFail(id);
    const user = await User.findByOrFail('username', username);

    await user.groups().detach([group.id]);
    await user.groups().attach([group.id], (row) => {
      row.is_moderator = true;
    });

    await Log.log(auth.user.id, request.ip(), {
      message: `Transformou o usuário ${user.username} em moderador do grupo ${group.name}`
    });

    session.flash({
      success: `Usuário ${user.username} adicionado à moderação do grupo ${group.name}.`
    });
    return response.redirect(
      `${Route.url('admin:groups.members', { id: group.id })}#$tab/mods`
    );
  }

  /**
   * Remove um usuário da posição de moderador de um determinado grupo.
   *
   * @method POST
   */
  async removeModerator({ request, response, params: { id }, session, auth }) {
    const users = request.collect(['username']).map(({ username }) => username);

    const group = await Group.findOrFail(id);

    for (const username of users) {
      const user = await User.findByOrFail('username', username);

      await user.groups().detach([group.id]);
      await user.groups().attach([group.id], (row) => {
        row.is_moderator = false;
      });

      await Log.log(auth.user.id, request.ip(), {
        message: `Removeu o usuário ${user.username} da moderação do grupo ${group.name}`
      });
    }

    session.flash({
      success: `Usuário(s) "${users.join(
        ', '
      )}" removido(s) da moderação do grupo ${group.name}.`
    });
    return response.redirect(
      `${Route.url('admin:groups.members', { id: group.id })}#$tab/mods`
    );
  }
}

module.exports = GroupController;
