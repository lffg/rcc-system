'use strict'

const RequestController = use('App/Models/RequestController')
const { RequestInterface } = use('App/Services/Request')
const RequestType = use('App/Models/RequestType')
const FormError = use('App/Exceptions/FormError')
const Position = use('App/Models/Position')
const Group = use('App/Models/Group')
const Hash = use('Hash')

const UserHook = exports = module.exports = {}

/**
 * Cria um hash para a senha do usuário.
 *
 * @param {object} userInstance
 */
UserHook.hashPassword = async (userInstance) => {
  if (typeof userInstance.password === 'string' && userInstance.password === '') {
    throw new FormError('Senha inválida: a senha não pode ser vazia.', 400)
  }

  if (userInstance.dirty.password) {
    userInstance.password = await Hash.make(userInstance.password)
  }
}

/**
 * Cria a relação entre o novo usuário e o grupo-padrão de usuários.
 *
 * @param {object} userInstance
 */
UserHook.addToUsersGroup = async (userInstance) => {
  const usersGroup = await Group.findByOrFail('alias', 'USERS')
  await userInstance.groups().attach([usersGroup.id])
}

/**
 * Associa o novo usuário à posição de recruta.
 *
 * @param {object} userInstance
 */
UserHook.addUserToPosition = async (userInstance) => {
  if (!userInstance.position_id) {
    const rec = await Position.findByOrFail('alias', 'REC')
    await userInstance.position().associate(rec)
  }
}

/**
 * Cria um evento na timeline para certificar a criação do usuário.
 *
 * @param {object} userInstance
 */
UserHook.createAccountRegisterEvent = async (userInstance) => {
  const controller = await RequestController.findByOrFail('alias', 'SYS_METADATA')
  const type = await RequestType.findByOrFail('alias', 'REGISTER')

  await RequestInterface.create({
    controller_id: controller.id,
    type_id: type.id,
    author_id: userInstance.id,
    receiver_id: userInstance.id,
    is_reviewable: false,
    crh_state: 'NON_CRH',
    notes: `Criação da conta para o usuário ${userInstance.username} efetivada.`
  })
}
