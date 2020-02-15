const RequestController = use('App/Models/RequestController');
const { splitNicks } = use('App/Helpers/split-nicks');
const RequestType = use('App/Models/RequestType');

/**
 * Valida o payload de uma requisição para criar um requerimento.
 *
 * Step:
 *   • 1 => Parte 1 para a parte 2;
 *   • 2 => Parte 2 para a parte 3;
 *   • 3 => Parte 3 para o envio.
 *
 * @param  {number} step
 * @param  {any} payload
 * @return {Promise<{ status: boolean, code?: string, params?: string[] }}
 */
module.exports = async function validate(step, payload) {
  const controller = await validateController(payload.controller_id);
  if (!controller) {
    return error('INVALID_CONTROLLER');
  }

  if (step === 1) {
    return { status: true };
  }

  const type = await RequestType.find(payload.type_id || null);
  if (!type || !(await validateType(controller, type))) {
    return error('INVALID_TYPE');
  }

  const validUsers = await validateUsers(payload.receivers, type);
  if (!validUsers.status) {
    return error(validUsers.code, validUsers.params);
  }

  if (step === 2) {
    return { status: true };
  }

  const validFields = await validateFields(payload, type);
  if (!validFields.status) {
    return error(validFields.code, validFields.params);
  }

  return { status: true };
};

/**
 * Retorna um objeto de erro utilizado pela interface de requisições.
 *
 * @param  {string} code
 * @param  {string[]} params
 * @return {{ status: false, code: string, params: string[] }}
 */
function error(code, params = []) {
  return {
    status: false,
    code,
    params
  };
}

/**
 * Valida a existência de um controller, retornando-o, se existir.
 *
 * @param  {number|string} controllerId
 * @return {RequestController|false}
 */
async function validateController(controllerId = null) {
  const controller = await RequestController.find(controllerId);
  if (!controller || !controller.is_crh) return false;
  return controller;
}

/**
 * Valida um tipo para um determinado controller. Verifica se o controller
 * tem relação com o tipo passado.
 *
 * @param  {RequestController} controller
 * @param  {RequestType} type
 * @return {Promise<boolean>}
 */
async function validateType(controller, type) {
  const types = await RequestType.findTypesFor(controller.id).then((types) =>
    types.map(({ id }) => id)
  );

  return types.includes(parseInt(type.id, 10));
}

/**
 * Valida os usuários enviados por "receivers".
 *
 * @param  {string} receivers
 * @param  {RequestType} type
 * @return {Promise<{ status: boolean, code?: string, params?: string[] }>}
 */
async function validateUsers(receivers, type) {
  const users = splitNicks(receivers, true);
  const { status, code = null, params = [] } = await type.validateUsers(users);
  return { status, code, params };
}

/**
 * Valida o payload.
 *
 * @param  {any} payload
 * @param  {RequestType} type
 * @return {Promise<{ status: boolean, code?: string, params?: string[] }>}
 */
async function validateFields(payload, type) {
  const { status, code = null, params = [] } = await type.validateFields(
    payload
  );
  return { status, code, params };
}
