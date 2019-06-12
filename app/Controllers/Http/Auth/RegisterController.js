const shortid = require('shortid');

const User = use('App/Models/User');

class RegisterController {
  /**
   * Mostra a página com o formulário de registro.
   *
   * @method GET
   */
  register({ view, session }) {
    const motto = `RCC-${shortid.generate()}`;

    session.put('confirm-motto', motto);
    return view.render('pages.session.auth.register', { motto });
  }

  /**
   * Cria um novo usuário, através do formulário de registro.
   *
   * @method POST
   */
  async postRegister({ request, response, session }) {
    const data = request.only(['username', 'password', 'email']);
    await User.create(data);

    session.flash({
      success: `Usuário ${data.username} criado com sucesso. Solicite a ativação para entrar.`
    });
    return response.route('login');
  }
}

module.exports = RegisterController;
