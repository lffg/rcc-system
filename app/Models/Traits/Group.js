'use strict'

class Group {
  register (Model) {
    Model.queryMacro('sortByOrder', function (limit = false) {
      this.orderBy('order', 'ASC')

      if (limit) this.limit(1)

      return this
    })
  }
}

module.exports = Group
