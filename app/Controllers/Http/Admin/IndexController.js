'use strict'

class IndexController {
  /**
   * Shows the admin dashboard.
   *
   * @param {object} ctx.view
   */
  index ({ view }) {
    return view.render('admin.dashboard.index')
  }
}

module.exports = IndexController
