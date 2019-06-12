class Main {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      location: 'required|in:BR,PT,AO,MZ,OTHER',
      gender: 'required|in:M,F',
      bio: 'max:350'
    };
  }

  get messages() {
    return {
      required: 'Este campo é obrigatório.',
      in: 'Este campo é inviolável: o valor deve ser um dos apresentados.',
      'bio.max': 'A biografia deve ter, no máximo, 350 caracteres.'
    };
  }

  async fails(errorMessages) {
    const { response, session } = this.ctx;

    session
      .flash({ danger: 'Whoops! Parece que houveram alguns erros.' })
      .withErrors(errorMessages)
      .flashAll();

    return response.redirect('back');
  }
}

module.exports = Main;
