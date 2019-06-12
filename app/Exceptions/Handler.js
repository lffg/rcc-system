const BaseExceptionHandler = use('BaseExceptionHandler');
const Env = use('Env');

class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Retorna uma lista com os códigos de erro que tem uma tratativa de
   * erro criada.
   *
   * @return {number[]}
   */
  get availableStatus() {
    return [400, 401, 403, 404, 500];
  }

  /**
   * Lida com os erros HTTP.
   */
  async handle(error, ctx) {
    const handle = false;
    if (!handle) return super.handle(...arguments);

    this.error = error;
    this.ctx = ctx;

    const { code, name, status } = error;
    const { request, response, session } = ctx;

    // Resolve o erro de sessão inválida.
    if (code === 'E_INVALID_SESSION') {
      if (request.ajax()) {
        return response.status(401).json({ reload: true });
      }

      session.flash({
        danger: 'Você precisa estar autenticado para ver esta página.'
      });
      await session.commit();
      return response.route('login');
    }

    // Resolve o erro de entidade (model) não encontrada.
    if (name === 'ModelNotFoundException') {
      return this.respond(404);
    }

    // Resolve os erros 400, 401, 403, 404 e 500:
    if (name === 'HttpException' && this.availableStatus.includes(status)) {
      return this.respond(status);
    }

    // Resolve outros erros (DEV):
    if (Env.get('NODE_ENV') === 'development') {
      return super.handle(...arguments);
    }

    // Resolve outros erros como 500 (PROD):
    return this.respond(500);
  }

  /**
   * Responde a um erro HTTP.
   */
  respond(status = 500) {
    const { message } = this.error;
    const { request, response, view } = this.ctx;

    if (request.accepts(['json', 'html']) === 'json') {
      return this.respondViaJSON(status);
    }

    response.status(status);

    try {
      response.send(view.render(`errors.${status}`, { message }));
    } catch (error) {
      response.send(`ERROR: ${status} server error.`);
    }
  }

  /**
   * Responde a um erro HTTP em formato JSON.
   */
  respondViaJSON(status = 500) {
    const { message: devMessage, status: devStatus } = this.error;
    const { response } = this.ctx;

    const message = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Page not found',
      500: 'Internal server error' // Padrão
    }[status];

    return response.status(status).json({
      error: true,
      message,
      status,
      ...(Env.get('NODE_ENV') === 'development'
        ? {
            __dev: { message: devMessage, status: devStatus }
          }
        : {})
    });
  }
}

module.exports = ExceptionHandler;
