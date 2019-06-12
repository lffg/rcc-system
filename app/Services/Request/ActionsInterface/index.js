const { join } = require('path');
const ActionError = require('./ext/ActionError');

const RequestController = use('App/Models/RequestController');
const RequestReview = use('App/Models/RequestReview');
const RequestType = use('App/Models/RequestType');
const Request = use('App/Models/Request');
const User = use('App/Models/User');

/**
 * Interface responsável por executar as actions de um determinado tipo
 * de requisição.
 * Executa uma ou mais actions por instância.
 */
class ActionsInterface {
  constructor() {
    this._systemAction = false;
    this._controller = null;
    this._authUser = null;
    this._payload = null;
    this._request = null;
    this._review = null;
    this._type = null;
  }

  /**
   * Seta as propriedades a serem usadas pelas actions.
   *
   * @param  {object}
   * @return {void}
   */
  use({
    systemAction = false,
    transaction = null,
    controller = null /** @type */,
    authUser = null /** @type */,
    payload = null,
    request = null /** @type */,
    review = null /** @type */,
    type = null /** @type */
  }) {
    if (
      (controller !== null && !(controller instanceof RequestController)) ||
      (review !== null && !(review instanceof RequestReview)) ||
      (request !== null && !(request instanceof Request)) ||
      (authUser !== null && !(authUser instanceof User)) ||
      (type !== null && !(type instanceof RequestType))
    ) {
      throw new TypeError('Tipo inválido.');
    }

    this._systemAction = systemAction;
    this._transaction = transaction;
    this._controller = controller;
    this._authUser = authUser;
    this._payload = payload;
    this._request = request;
    this._review = review;
    this._type = type;
  }

  /**
   * Executa a action passada no primeiro parâmetro.
   *
   * @param  {string} actionName
   * @return {Promise<any>}
   */
  async execute(actionName) {
    let action;

    try {
      action = require(join(__dirname, 'actions', `${actionName}.js`));
    } catch (error) {
      if (error.code === 'MODULE_NOT_FOUND') {
        throw new Error(
          `Função (RequestAction) ${actionName} não encontrada no diretório das ações.`
        );
      }

      throw error;
    }

    const actionMeta = action();
    this._checkMeta(actionName, actionMeta);

    const result = await actionMeta.caller(
      {
        systemAction: this._systemAction,
        transaction: this._transaction,
        controller: this._controller,
        authUser: this._authUser,
        request: this._request,
        payload: this._payload,
        review: this._review,
        type: this._type
      },
      ActionError
    );

    return result;
  }

  _checkMeta(
    actionName,
    {
      requiresTransaction,
      requiresController,
      requiresAuthUser,
      requiresRequest,
      requiresReview,
      requiresType
    }
  ) {
    if (requiresTransaction && !this._transaction) {
      throw new Error(
        `Ação ${actionName} espera uma "transaction" que não foi passada.`
      );
    }

    if (requiresController && !this._controller) {
      throw new Error(
        `Ação ${actionName} espera uma instância "RequestController" que não foi passada.`
      );
    }

    if (requiresAuthUser && !this._authUser) {
      throw new Error(
        `Ação ${actionName} espera uma instância "User" que não foi passada.`
      );
    }

    if (requiresRequest && !this._request) {
      throw new Error(
        `Ação ${actionName} espera uma instância "Request" que não foi passada.`
      );
    }

    if (requiresReview && !this._review) {
      throw new Error(
        `Ação ${actionName} espera uma instâcnia "RequestReview" que não foi passada.`
      );
    }

    if (requiresType && !this._type) {
      throw new Error(
        `Ação ${actionName} espera uma instância "RequestType" que não foi passada.`
      );
    }

    if (!this._payload) {
      throw new Error(
        `Ação ${actionName} espera um payload que não foi passado.`
      );
    }
  }
}

module.exports = ActionsInterface;
