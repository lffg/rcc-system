const User = use('App/Models/User');

class Log {
  constructor() {
    this._actionAuthorId = null;
    this._actionAuthorIp = null;
  }

  set actionAuthorId(id = null) {
    this._actionAuthorId = id;
  }

  set actionAuthorIp(ip = null) {
    this._actionAuthorIp = ip;
  }

  async log(...logs) {
    if (!this._actionAuthorId) {
      throw new Error(
        '`actionAuthorId` é obrigatório para a instância do log.'
      );
    }

    const actionAuthor = await User.findOrFail(this._actionAuthorId);
    await this.constructor._iterate(logs, actionAuthor, this._actionAuthorIp);

    return true;
  }

  static async log(actionAuthorId, actionAuthorIp = null, ...logs) {
    if (!actionAuthorId) {
      throw new Error('`actionAuthorId` é obrigatório para criar um log.');
    }

    const actionAuthor = await User.findOrFail(actionAuthorId);
    await this._iterate(logs, actionAuthor, actionAuthorIp);

    return true;
  }

  static async _iterate(logs, actionAuthor, ip) {
    const promises = logs
      .filter((log) => typeof log !== 'string' && log.cond === false)
      .map((log) =>
        actionAuthor.logs().create({
          log: typeof log === 'string' ? log : log.message,
          ip: ip
        })
      );

    await Promise.all(promises);
  }
}

module.exports = Log;
