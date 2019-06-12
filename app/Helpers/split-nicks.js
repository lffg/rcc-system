const Database = use('Database');
const Route = use('Route');

module.exports = {
  splitNicks,
  fullSplitNicks
};

/**
 * Divide uma string de nicks, que serão divididos através do caractere
 * de barra simples (/) ou invertida (\).
 *
 * @param  {string} nicks
 * @param  {boolean} onlyEntries
 * @return {{ entries: string[], string: string }|string[]}
 */
function splitNicks(nicks = '', onlyEntries = false) {
  // Divide a string:
  const splitedNicks = nicks
    .split(/\\|\//)
    .map((s) => s.trim())
    .filter((s) => /\S/.test(s));

  // Remove repetições:
  const entries = [...new Set(splitedNicks)];

  if (onlyEntries) return entries;

  return {
    entries,
    string: entries.join(' / ')
  };
}

/**
 * Divide uma string de nicks, que serão divididos através do caractere
 * de barra simples (/) ou invertida (\). Faz também uma consulta no banco
 * de dados para consultar as posições dos usuários.
 *
 * @param  {...any} args
 * @return {Promise<any>}
 */
async function fullSplitNicks(
  nicks = '',
  onlyEntries = false,
  complex = false
) {
  if (!complex) return splitNicks(nicks, onlyEntries);
  const { entries: usernames, string } = splitNicks(nicks, onlyEntries);

  const entries = await Database.select('U.username', 'P.name as position_name')
    .from('users as U')
    .innerJoin('positions as P', 'P.id', '=', 'U.position_id')
    .whereIn('U.username', usernames)
    .map((user) => ({
      ...user,
      profile_link: `${Route.url('users.show')}?u=${user.username}`
    }));

  for (const nick of usernames) {
    if (
      !entries.find(
        ({ username }) =>
          username.trim().toUpperCase() === nick.trim().toUpperCase()
      )
    ) {
      entries.unshift({ username: nick });
    }
  }

  return { entries, string };
}
