class Request {
  register(Model) {
    /**
     * Verifica se o token passado é igual ao token salvo na BD.
     *
     * @param  {string} token
     * @return {boolean}
     */
    Model.prototype.validToken = function (token) {
      return this.integrity_token === token;
    };
  }
}

module.exports = Request;
