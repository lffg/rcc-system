'use strict'

const got = require('got')

class ValidateUser {
  /**
   *
   * @param  {string} name
   * @param  {string|boolean} motto
   * @return {{ status: boolean, error: null | string, refresh: boolean }}
   */
  static async validate(name = '', motto = false) {
    const result = { status: false, error: null, refresh: true }

    try {
      const {
        body: { motto: realMotto = '' }
      } = await got('https://www.habbo.com.br/api/public/users', {
        query: { name },
        cache: false,
        json: true
      })

      if (!!motto && realMotto !== motto) {
        result.error =
          'Erro de autenticação: O código de confirmação não encontra-se na sua missão.'
        result.refresh = false
      } else {
        result.status = true
        result.error = null
      }
    } catch (error) {
      const { code = 'ENOTDEFINED', response = {} } = error
      const { body = {} } = response

      if (!body || code === 'ECONNREFUSED') {
        result.error = `Whoops! Parece que houve um problema interno. Contate um desenvolvedor. [${code}]`
      }

      if (body.error === 'not-found') {
        result.error = `O usuário "${name}" não existe no Habbo.`
      } else {
        result.error =
          'Houve um erro ao tentar estabelecer conexão com a Habbo API. Tente novamente mais tarde.'
      }
    }

    return result
  }
}

module.exports = ValidateUser
