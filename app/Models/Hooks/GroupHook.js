const Group = use('App/Models/Group');

const GroupHook = (exports = module.exports = {});

/**
 * Define a ordem do grupo criado.
 *
 * @param {object} groupInstance
 */
GroupHook.setOrder = async (groupInstance) => {
  const lastGroup = await Group.query().orderBy('order', 'desc').first();

  try {
    const { order: lastOrder } = lastGroup.toJSON();
    groupInstance.order = parseInt(lastOrder, 10) + 1;
  } catch (e) {
    groupInstance.order = 1;
  }
};

/**
 * Reseta a ordem de todos os grupos após um deles ser removido.
 */
GroupHook.resetOrder = async () => {
  /** @type {{ id: number }[]} */
  const groups = await Group.query()
    .sortByOrder()
    .fetch()
    .then((groups) => groups.toJSON());

  for (const [index, { id }] of groups.entries()) {
    const group = await Group.findOrFail(id); // eslint-disable-line no-await-in-loop
    group.order = index + 1;
    await group.save(); // eslint-disable-line no-await-in-loop
  }
};
