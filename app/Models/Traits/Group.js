'use strict'

class Group {
  register(Model) {
    /**
     * ---------------------------------------------------------------------
     * Macro de queries:
     * ---------------------------------------------------------------------
     */

    /**
     * Cria um macro de query para ordenar os grupos de forma
     * ascendente, criando também, um limite opcional.
     */
    Model.queryMacro('sortByOrder', function(limit = false) {
      this.orderBy('order', 'ASC')

      if (limit) this.limit(1)

      return this
    })
  }
}

module.exports = Group
