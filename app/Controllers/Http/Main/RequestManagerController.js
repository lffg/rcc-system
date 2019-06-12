const { HttpException } = use('@adonisjs/generic-exceptions');
const { RequestInterface, getComputedRequestProps } = use(
  'App/Services/Request'
);
const Request = use('App/Models/Request');
const Database = use('Database');

class RequestManagerController {
  all() {
    return 'Hello from Manager.all';
  }

  async review({ request, response, params: { id, mode }, session, auth }) {
    const transaction = await Database.beginTransaction();
    const entity = await Request.findOrFail(id);

    if (
      !(await auth.user.hasPermission('CRH', true)) ||
      !['approve', 'reject'].includes(mode) ||
      entity.crh_state !== 'PENDING'
    ) {
      throw new HttpException('Acesso negado.', 403);
    }

    if (request.input('integrity_token') !== entity.integrity_token) {
      session.flash({
        danger:
          'Este requerimento foi atualizado enquanto você o revisava. Tente novamente.'
      });
      return response.redirect('back');
    }

    try {
      await RequestInterface[mode]({
        payload: { ...request.all(), type_id: entity.type_id },
        request: entity,
        transaction,
        authUser: auth.user
      });

      await transaction.commit();
      session.flash({ success: 'Operação realizada com sucesso.' });
    } catch ({ message }) {
      await transaction.rollback();
      session.flash({ danger: message });
    }

    return response.redirect('back');
  }

  async refresh({ response, params: { id }, session, auth }) {
    if (!(await auth.user.hasPermission('DEV', true))) {
      session.flash({
        danger: 'Você não tem permissão para executar essa operação.'
      });
      return response.redirect('back');
    }

    const request = await Request.findOrFail(id);
    request.merge(await getComputedRequestProps(request));
    await request.save();

    session.flash({ success: 'Atualizado com sucesso.' });
    return response.redirect('back');
  }
}

module.exports = RequestManagerController;
