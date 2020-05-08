/**
 * ---------------------------------------------------------------------
 * Menu :: Funções Especiais
 * ---------------------------------------------------------------------
 */

(function ($) {
  'use strict';

  $(function () {
    var $menu = $('.sys-menu');

    window.toggleMenu = function (type) {
      $('body').toggleClass('menu-shown', type);
    };

    $('body').on('click', function (event) {
      if (!$('body').is('.menu-shown')) return;

      event.preventDefault();
      window.toggleMenu(false);
    });

    $menu.on('click', function (event) {
      event.stopPropagation();
    });

    $menu.find('.sys-menu-nav ul li').each(function () {
      const $this = $(this);

      if (!$this.find('ul.submenu').length) return;

      $this
        .addClass('has-submenu')
        .children('a')
        .append('<i class="sys-menu-submenu-icon fa fa-angle-down"></i>');

      $this.children('a').on('click', function (event) {
        event.preventDefault();

        $menu
          .find('.sys-menu-nav ul li.is-opened')
          .not($this)
          .removeClass('is-opened')
          .children('.submenu')
          .stop()
          .slideUp();

        $this.toggleClass('is-opened');
        $this.children('.submenu').stop().slideToggle();
      });
    });
  });
})(jQuery);
