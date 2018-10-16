'use strict'

const Group = use('App/Models/Group')

const GroupHook = exports = module.exports = {}

/**
 * Sets the order to the created group.
 *
 * @param {object} groupInstance
 */
GroupHook.setOrder = async (groupInstance) => {
  const lastGroup = await Group.query()
    .orderBy('order', 'desc')
    .first()

  try {
    const { order: lastOrder } = lastGroup.toJSON()
    groupInstance.order = parseInt(lastOrder) + 1
  } catch (e) {
    groupInstance.order = 1
  }
}

/**
 * Resets the order value of all groups after one is deleted.
 */
GroupHook.resetOrder = async () => {
  const groups = await Group.query()
    .sortByOrder()
    .fetch()
    .then((groups) => groups.toJSON())

  for (const index in groups) {
    const { id } = groups[index]

    const group = await Group.findOrFail(id)
    group.order = parseInt(index) + 1
    await group.save()
  }
}
