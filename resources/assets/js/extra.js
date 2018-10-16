/**
 * ---------------------------------------------------------------------
 * Outros
 * ---------------------------------------------------------------------
 */

(function ($) {
  'use strict';

  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    $(document).ajaxSuccess(function () {
      $('[data-toggle="tooltip"]').tooltip('dispose');
      $('[data-toggle="tooltip"]').tooltip();
    });
  });
})(jQuery);

