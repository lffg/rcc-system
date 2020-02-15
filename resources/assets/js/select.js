/**
 * ---------------------------------------------------------------------
 * Select
 * ---------------------------------------------------------------------
 */

(function($) {
  'use strict';

  $(function() {
    if (!$('.sys-select-menu-wrapper').length) return false;

    $('.sys-select-menu-wrapper').each(function() {
      var $wrapper = $(this);
      var $input = $wrapper.find('.sys-select-input');
      var $menu = $wrapper.find('.sys-select-menu');

      if (!$input || !$menu) {
        throw new Error(
          'O elemento wrapper deve ter `input` e `menu` elementos.'
        );
      }

      $menu.html(
        [
          '<header class="sys-select-label">',
          '  Use o campo acima para filtrar ícones pelo atributo classe.',
          '</header>',
          '<div class="sys-select-menu-items">',
          $menu.html(),
          '</div>'
        ].join('')
      );

      var toggle = function() {
        $menu.find('.sys-select-item').each(function() {
          var $this = $(this);

          if ($this.attr('data-empty-control') !== 'true') {
            $this.toggle($this.attr('data-text').indexOf($input.val()) !== -1);
          }

          $this.on('click', function() {
            $input.val($this.attr('data-text'));
            $menu.hide();
          });
        });
      };

      toggle();

      $(document).on('click', function(event) {
        if ($menu.is(':hidden')) return;

        event.preventDefault();
        event.stopPropagation();
        $menu.hide();
      });

      $.each([$input, $menu], function() {
        this.on('click', function(event) {
          event.stopPropagation();
        });
      });

      $input.on('focus', function() {
        $menu.show();
      });

      $input.on('keyup', function() {
        toggle();
      });
    });
  });
})(jQuery);
