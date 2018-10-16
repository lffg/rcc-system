'use strict'

/*
|--------------------------------------------------------------------------
| Hooks
|--------------------------------------------------------------------------
|
| For this file, check out the documentation:
| https://adonisjs.com/docs/4.0/ignitor#_hooks
|
*/

const moment = require('moment')

const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersRegistered(() => {
  const Validator = use('Validator')
  const Database = use('Database')
  const Config = use('Config')
  const View = use('View')

  /**
   * Extends validator with 'exists' rule.
   */
  const existsFn = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) {
      return
    }

    const [table, column] = args
    const row = await Database.table(table).where(column, value).first()

    if (!row) {
      throw message
    }
  }

  Validator.extend('exists', existsFn)

  /**
   * Adds a "num" global method into the views:
   */
  View.global('num', (n) => {
    return Number(n)
  })

  /**
   * Adds a "has" global method into the views:
   */
  View.global('has', (el, defaultValue = '') => {
    return el || defaultValue
  })

  /**
   * Adds an "absolute" global method into the views:
   */
  View.global('absolute', (url = '') => {
    let base = Config.get('app.url')

    base = base.replace(/^\/|\/$/g, '')
    url = url.replace(/^\/|\/$/g, '')

    return `${base}/${url}`
  })

  /**
   * Adds a "currentTime" global method into the views:
   */
  View.global('now', () => {
    return Date.now()
  })

  /**
   * Adds a "Date" global alias into de views:
   */
  View.global('Date', (...args) => {
    return new Date(...args)
  })

  /**
   * Adds a moment.js global alias into the views:
   */
  View.global('moment', (...args) => {
    return moment(...args)
  })
})
