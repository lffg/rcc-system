'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Env = use('Env')

class ExceptionHandler extends BaseExceptionHandler {
  get availableStatus () {
    return [400, 401, 403, 404, 500]
  }

  /**
   * Handles the HTTP errors.
   *
   * @param {object} error
   * @param {object} ctx
   */
  async handle (error, ctx) {
    const handle = false
    if (!handle) return super.handle(...arguments)

    this.error = error
    this.ctx = ctx

    const { code, name, status } = error
    const { request, response, session } = ctx

    // Handle invalid session error:
    if (code === 'E_INVALID_SESSION') {
      if (request.ajax()) {
        return response.status(401).json({ reload: true })
      }

      session.flash({ danger: 'Você precisa estar autenticado para ver esta página.' })
      await session.commit()
      return response.route('login')
    }

    // Handle model not found error:
    if (name === 'ModelNotFoundException') {
      return this._respond(404)
    }

    // Handle 400, 401, 403, 404 and 500 erros:
    if (name === 'HttpException' && this.availableStatus.includes(status)) {
      return this._respond(status)
    }

    // Handle others erros (in development):
    if (Env.get('NODE_ENV') === 'development') {
      return super.handle(...arguments)
    }

    // Handle 500 error if in production:
    return this._respond(500)
  }

  /**
   * Responds to a HTTP error.
   *
   * @param {number} status
   */
  _respond (status = 500) {
    const { message } = this.error
    const { request, response, view } = this.ctx

    if (request.accepts(['json', 'html']) === 'json') {
      return this._respondViaJSON(status)
    }

    response.status(status)

    try {
      response.send(view.render(`errors.${status}`, { message }))
    } catch (error) {
      response.send(`ERROR: ${status} server error.`)
    }
  }

  /**
   * Responds via JSON to a HTTP error.
   * @param {number} status
   */
  _respondViaJSON (status = 500) {
    const { message: devMessage, status: devStatus } = this.error
    const { response } = this.ctx

    const message = ({
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Page not found',
      500: 'Internal server error' // default one
    })[status]

    return response.status(status).json({
      error: true,
      message,
      status,
      ...(Env.get('NODE_ENV') === 'development' ? {
        __dev: { message: devMessage, status: devStatus }
      } : {})
    })
  }
}

module.exports = ExceptionHandler
