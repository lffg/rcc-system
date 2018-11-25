'use strict'

const template = (action) => (`'use strict'

/**
 * Action usada para:
 *    - Especialização em Requerimento :: ${action}
 */

module.exports = () => ({
  requiresTransaction: true,
  requiresController: false,
  requiresAuthUser: true,
  requiresRequest: true,
  requiresReview: false,
  requiresType: false,
  caller
})

async function caller ({ transaction, authUser, request, payload }) {

}
`)

const { promisify } = require('util')
const { join } = require('path')
const fs = require('fs')

const actions = [
  'SPEC_CFSD_APPROVAL',
  'SPEC_PRO',
  'SPEC_REB',
  'SPEC_REJOIN',
  'SPEC_ABS_REQUEST',
  'SPEC_RES_REQUEST',
  'SPEC_ADV',
  'SPEC_BUY_POS',
  'SPEC_TAG_REQUEST',
  'SPEC_E_GRAT',
  'SPEC_T_GRAT',
  'SPEC_DESL_H',
  'SPEC_DESL_D',
  'SPEC_REF_REQUEST',
  'SPEC_EXO',
  'SPEC_SUP_REPR',
  'SPEC_CHANGE_ACC'
]

const writeFile = promisify(fs.writeFile)

async function main () {
  const dir = join(__dirname, 'app', 'Services', 'Request', 'ActionsInterface', 'actions')

  for (const action of actions) {
    await writeFile(join(dir, `${action}.js`), template(action))
    console.log(`[INFO] ${action} criado.`)
  }
}

main().then('[INFO] Done.').catch((err) => console.error(err))
