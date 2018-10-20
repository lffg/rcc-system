'use strict'

class UserSalary {
  register (Model) {
    /**
     * Returns the user salary.
     *
     * @return {object}
     */
    Model.prototype.getSalary = async function () {
      const fixSalary = await this.getFixSalary()
      const fullSalary = await this.getFullSalary()

      return { fixSalary, fullSalary }
    }

    /**
     * Returns the user's salary based on its position.
     *
     * @return {number}
     */
    Model.prototype.getFixSalary = async function () {
      const user = await Model.query()
        .where({ id: this.id })
        .with('position', (builder) => builder.select('id', 'salary'))
        .first()
        .then((user) => user.toJSON())

      return user.position ? user.position.salary || 0 : 0
    }

    Model.prototype.getMedalsSalary = function () {
      const temporary = this.temporary_bonuses
      const effective = this.effective_bonuses

      return Math.floor((temporary + effective) / 20)
    }

    /**
     * Returns the user's full salary.
     *
     * @param  {number} fixSalary
     * @param  {number} medalsSalary
     * @return {number}
     */
    Model.prototype.getFullSalary = async function () {
      const fixSalary = await this.getFixSalary()
      const medalsSalary = this.getMedalsSalary()

      return fixSalary + medalsSalary
    }
  }
}

module.exports = UserSalary
