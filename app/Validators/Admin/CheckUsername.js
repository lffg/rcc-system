const Database = use('Database');

class CheckUsername {
  async authorize() {
    const { request, response, session } = this.ctx;

    const users = request
      .collect(['username'])
      .map(({ username }) => username.trim())
      .filter((username) => !!username && typeof username === 'string');

    const query = await Database.from('users')
      .select('username')
      .whereIn('username', users)
      .then((users) => users.map(({ username }) => username.toLowerCase()));

    for (const user of users) {
      if (!query.includes(user.toLowerCase())) {
        session.flash({ danger: `O usuário ${user} não existe.` });
        return response.redirect('back');
      }
    }

    return true;
  }

  get rules() {
    return {
      username: 'required'
    };
  }

  get messages() {
    return {
      'username.required':
        'Você deve fornecer o nome de usuário para completar a ação.'
    };
  }

  fails(errorMessages) {
    const { response, session } = this.ctx;
    const [{ message }] = errorMessages;

    session.flash({ danger: message });
    return response.redirect('back');
  }
}

module.exports = CheckUsername;
