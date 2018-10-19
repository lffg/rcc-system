'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions')

module.exports = validate

/**
 * Valida um payload para requisição, de acordo com a parte informada.
 *
 * @param  {1|2|3|'POST'} step
 * @return {Promise<boolean>}
 */
async function validate (step) {
  if (![1, 2, 3].includes(step)) {
    throw new HttpException('Argumento inválido.')
  }

}
