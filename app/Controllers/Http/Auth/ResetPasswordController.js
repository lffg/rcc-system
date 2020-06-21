const User = use('App/Models/User');

class ResetPasswordController {
  /**
   * Mostra a página que inicia o processo de recuperação de senha.
   *
   * @method GET
   */
  index({ view }) {
    return view.render('pages.session.auth.reset-password');
  }

  /**
   * Verifica se existem usuários com o e-mail fornecido. Caso afirmativo, um
   * e-mail é enviado ao usuário em questão.
   *
   * @method POST
   */
  async sendEmail({ request, response, session }) {
    const email = request.input('email');
    // TODO(lffg):
    let user;

    try {
      // eslint-disable-next-line
      user = await User.findByOrFail('email', email);
    } catch (error) {
      session.flash({ danger: 'Não existem usuários com este e-mail.' });
      return response.redirect('back');
    }
  }
}

module.exports = ResetPasswordController;
