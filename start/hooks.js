const { hooks } = require('@adonisjs/ignitor')
const moment = require('moment')
const { stringify } = require('querystring')

hooks.after.providersRegistered(() => {
  const Validator = use('Validator')
  const Database = use('Database')
  const Helpers = use('Helpers')
  const Config = use('Config')
  const Route = use('Route')
  const View = use('View')

  /**
   * Extende o provider de validação com a regra "exists".
   */
  const existsFn = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) {
      return
    }

    const [table, column] = args
    const row = await Database.table(table)
      .where(column, value)
      .first()

    if (!row) {
      throw message
    }
  }

  Validator.extend('exists', existsFn)

  /**
   * Adiciona um método "num" para as views".
   */
  View.global('num', (n) => {
    return Number(n)
  })

  /**
   * Adiciona um método "has" para as views.
   */
  View.global('has', (el, defaultValue = '') => {
    return el || defaultValue
  })

  /**
   * Adiciona um método "absolute" para as views".
   */
  View.global('absolute', (url = '') => {
    let base = Config.get('app.url')

    base = base.replace(/^\/|\/$/g, '')
    url = url.replace(/^\/|\/$/g, '')

    return `${base}/${url}`
  })

  /**
   * Adiciona um método "now" para as views.
   */
  View.global('now', () => {
    return Date.now()
  })

  /**
   * Adiciona uma instância de "Date" para as views.
   */
  View.global('Date', (...args) => {
    return new Date(...args)
  })

  /**
   * Adiciona um método global "toQueryString" nas views.
   */
  View.global('toQueryString', (...objects) => {
    let main = {}

    for (const object of objects) {
      main = Object.assign(main, object)
    }

    return stringify(main)
  })

  /**
   * Método para inserir link para usuário.
   */
  View.global('userLink', function(username, className) {
    return this.safe(
      `<a ${className || ''} href="${Route.url(
        'users.show'
      )}?u=${username}">${username}</a>`
    )
  })

  /**
   * Adiciona a instância do Moment.JS para as views.
   */
  View.global('moment', (...args) => {
    moment.updateLocale('pt-br', require(Helpers.resourcesPath('i18n/moment')))
    moment.locale('pt-br')

    moment.prototype.f = function(short = false) {
      if (!short) {
        return this.format('LLLL')
      }

      return this.format('DD MMM YYYY')
    }

    moment.prototype.ut = function() {
      return this.format('x')
    }

    return moment(...args)
  })
})
