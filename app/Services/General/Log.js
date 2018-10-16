'use strict'

const User = use('App/Models/User')

class Log {
  /**
   * Class constructor.
   *
   * @constructor
   */
  constructor () {
    this._actionAuthorId = null
    this._actionAuthorIp = null
  }

  /**
   * Sets the actionAuthorId property.
   *
   * @param {number} id
   */
  set actionAuthorId (id = null) {
    this._actionAuthorId = id
  }

  /**
   * Sets the actionAuthorIp property.
   *
   * @param {string} ip
   */
  set actionAuthorIp (ip = null) {
    this._actionAuthorIp = ip
  }

  /**
   * Starts the process of creating a log.
   *
   * @param  {...object} logs
   * @return {boolean}
   */
  async log (...logs) {
    if (!this._actionAuthorId) {
      throw new Error('`actionAuthorId` é obrigatório para a instância do log.')
    }

    const actionAuthor = await User.findOrFail(this._actionAuthorId)
    await this.constructor._iterate(logs, actionAuthor, this._actionAuthorIp)

    return true
  }

  /**
   * Starts the process of creating a log. (Static)
   *
   * @static
   * @param  {number} actionAuthorId
   * @param  {string} actionAuthorIp
   * @param  {...object} logs
   * @return {boolean}
   */
  static async log (actionAuthorId, actionAuthorIp = null, ...logs) {
    if (!actionAuthorId) {
      throw new Error('`actionAuthorId` é obrigatório para criar um log.')
    }

    const actionAuthor = await User.findOrFail(actionAuthorId)
    await this._iterate(logs, actionAuthor, actionAuthorIp)

    return true
  }

  /**
   * Saves the log messages.
   *
   * @param {array} logs
   * @param {number} actionAuthor
   * @param {string} ip
   */
  static async _iterate (logs, actionAuthor, ip) {
    for (let log of logs) {
      if (typeof log === 'string') {
        log = { message: log, cond: true }
      }

      const { message, cond = true } = log
      if (!cond) continue

      await actionAuthor.logs().create({
        log: message,
        ip: ip
      })
    }
  }
}

module.exports = Log
