class Todo {
  async handle({ response, session }) {
    session.flash({ warning: 'Este recurso será implementado em breve...' });
    return response.redirect('back');
  }
}

module.exports = Todo;
