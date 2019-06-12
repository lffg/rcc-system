const got = require('got');

/**
 * Verifica se o usuário existe no Habbo.
 *
 * @param  {string} username
 * @return {Promise<{ status: boolean, message: string }>}
 */
module.exports = async function existsHabboUser(username) {
  try {
    await got('https://www.habbo.com.br/api/public/users', {
      query: { name: username },
      cache: false,
      json: true
    });
  } catch (error) {
    return false;
  }

  return true;
};
