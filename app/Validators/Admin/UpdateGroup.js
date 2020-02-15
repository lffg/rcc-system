const icons = require('fa-icon-list')();

const { rule } = use('Validator');

class UpdateGroup {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'required|max:100',
      description: 'max:1000',
      is_hidden: 'required|in:0,1',
      icon: [rule('in', ['', ...icons])],
      color: [rule('required'), rule('regex', /^#(?:[0-9a-f]{3}){1,2}$/i)]
    };
  }

  get messages() {
    return {
      'name.required': 'O nome do grupo é obrigatório.',
      'name.max': 'O nome do grupo não pode ser maior que 100 caracteres.',
      'description.max':
        'A descrição não pode ser maior do que 1000 caracteres.',
      'is_hidden.required': 'O estado de visibilidade é obrigatório',
      'is_hidden.in': 'O estado de visibilidade encontra-se inválido.',
      'icon.in': 'O ícone é inválido.',
      'color.required': 'A cor é obrigatória.',
      'color.regex': 'A cor é inválida. Tente novamente.'
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

module.exports = UpdateGroup;
