class IndexController {
  /**
   * Mostra o dashboard do painel administrativo.
   *
   * @method GET
   */
  index({ view }) {
    return view.render('admin.dashboard.index');
  }
}

module.exports = IndexController;
