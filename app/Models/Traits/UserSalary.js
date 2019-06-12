class UserSalary {
  register(Model) {
    /**
     * ---------------------------------------------------------------------
     * Métodos da instância:
     * ---------------------------------------------------------------------
     */

    /**
     * Retorna o salário de um usuário.
     *
     * @return {Promise<{ fixSalary: number, fullSalary: number }>}
     */
    Model.prototype.getSalary = async function() {
      const fixSalary = await this.getFixSalary();
      const fullSalary = await this.getFullSalary();

      return { fixSalary, fullSalary };
    };

    /**
     * Retorna o salário fixo de um usuário baseado em sua posição.
     *
     * @return {Promise<number>}
     */
    Model.prototype.getFixSalary = async function() {
      const user = await Model.query()
        .where({ id: this.id })
        .with('position', (builder) => builder.select('id', 'salary'))
        .first()
        .then((user) => user.toJSON());

      return user.position ? user.position.salary || 0 : 0;
    };

    /**
     * Retorna o salário de um usuário baseado em suas medalhas.
     *
     * @return {number}
     */
    Model.prototype.getMedalsSalary = function() {
      const temporary = this.temporary_bonuses || 0;
      const effective = this.effective_bonuses || 0;

      return Math.floor((temporary + effective) / 20);
    };

    /**
     * Retorna o salário completo de um usuário.
     *
     * @return {Promise<number>}
     */
    Model.prototype.getFullSalary = async function() {
      const fixSalary = await this.getFixSalary();
      const medalsSalary = this.getMedalsSalary();

      return fixSalary + medalsSalary;
    };
  }
}

module.exports = UserSalary;
