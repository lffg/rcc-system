class ErrorTicket {
  get rules() {
    return {
      message: 'required',
      type: 'required|in:BUG,SPELLING,OTHER'
    };
  }

  get messages() {
    return {
      required:
        'Erro ao criar o ticket: você deve completar os campos obrigatórios.',
      in:
        'Erro ao criar o ticket: os valores não estão normalizados. Tente novamente.'
    };
  }

  async fails(errorMessages) {
    const { response, session } = this.ctx;
    const [{ message }] = errorMessages;

    session.flash({ danger: message });
    return response.redirect('back');
  }
}

module.exports = ErrorTicket;
