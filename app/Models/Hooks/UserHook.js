'use strict'

const FormError = use('App/Exceptions/FormError')
const Position = use('App/Models/Position')
// const CrhRequest = use('App/Services/Crh')
const Group = use('App/Models/Group')
const Hash = use('Hash')

const UserHook = exports = module.exports = {}

/**
 * Password hasher hook.
 *
 * @param {object} userInstance
 */
UserHook.hashPassword = async (userInstance) => {
  if (typeof userInstance.password === 'string' && userInstance.password === '') {
    throw new FormError('Senha não pode ser um campo vazio.', 400, 'E_BLANK_PASSWORD')
  }

  if (userInstance.dirty.password) {
    userInstance.password = await Hash.make(userInstance.password)
  }
}

/**
 * Hook to attach the new user to the users group.
 *
 * @param {object} userInstance
 */
UserHook.addToUsersGroup = async (userInstance) => {
  const usersGroup = await Group.findByOrFail('alias', 'USERS')
  await userInstance.groups().attach([usersGroup.id])
}

/**
 * Hook to associate the new user to the recruit position.
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
 * Hook to create a timeline event for account creation.
 *
 * @param {object} userInstance
 *
UserHook.createAccountRegisterEvent = async (userInstance) => {
  const controller_id = await CrhRequest.helpers.controller.findByAlias('REGISTRO', true)
  const type_id = await CrhRequest.helpers.type.findByAlias('CREATE_ACC', true)

  const request = new CrhRequest()

  request.controller_id = controller_id
  request.crhHasReview = false
  request.type_id = type_id
  request.title = 'Criação da Conta'
  request.description = `Criação da conta do usuário ${userInstance.username} efetivada.`

  request.affectedId = userInstance.id
  request.affectedPositionBefore = userInstance.position_id
  request.author_id = userInstance.id

  await request.save()
} */
