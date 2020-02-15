const { validate } = use('App/Services/General/ValidateUser');

class EditUser {
  get validateAll() {
    return true;
  }

  async authorize() {
    const { request, response, session } = this.ctx;

    if (request.input('validate_user') !== 'on') return true;

    const { status, error } = await validate(request.input('username'));

    if (!status) {
      session.flash({ danger: error });
      return response.redirect('back');
    }

    return true;
  }

  get rules() {
    const {
      params: { id }
    } = this.ctx;

    return {
      username: `required|unique:users,username,id,${id}`,
      email: `required|email|max:175|unique:users,email,id,${id}`,
      password: 'max:50',
      state: 'required|in:ACTIVE,INACTIVE,RETIRED,VETERAN',
      position_id: 'required|exists:positions,id',
      temporary_bonuses: 'required|integer',
      effective_bonuses: 'required|integer'
    };
  }

  get messages() {
    return {
      'username.required': 'O nome de usuário é obrigatório',
      'username.unique': 'Este nome de usuário já está em uso.',
      'password.required':
        'A senha fornecida ultrapassa o limite de 50 caracteres.',
      'email.unique': 'Este e-mail já está em uso.',
      'email.email': 'Este e-mail não é válido.',
      'email.max': 'O e-mail deve ter, no máximo, 175 caracteres.',
      'state.required': 'O estado do usuário é obrigatório.',
      'state.in': 'Estado de usuário inválido.',
      'position_id.required': 'O campo "posição" é obrigatório.',
      'position_id.exists': 'A posição selecionada não existe. Estranho, hein!',
      'temporary_bonuses.required':
        'O campo de gratificações temporárias é obrigatório.',
      'temporary_bonuses.integer':
        'Número de medalhas inválido em "gratificações temporárias".',
      'effective_bonuses.required':
        'O campo de gratificações efetivas é obrigatório.',
      'effective_bonuses.integer':
        'Número de medalhas inválido em "gratificações efettivas".'
    };
  }

  fails(errorMessages) {
    const { response, session } = this.ctx;

    session
      .flash({ danger: 'Whoops! Parece que houveram alguns erros.' })
      .withErrors(errorMessages)
      .flashAll();

    return response.redirect('back');
  }
}

module.exports = EditUser;
