/**
 * ---------------------------------------------------------------------
 * Outros
 * ---------------------------------------------------------------------
 */

(function ($) {
  'use strict';

  $(function () {
    $('[title]').not('[data-tooltip="off"]').tooltip();
    $('[data-toggle="popover"]').popover();

    $(document).ajaxSuccess(function () {
      $('[title]').not('[data-tooltip="off"]').tooltip('dispose');
      $('[title]').not('[data-tooltip="off"]').tooltip();
    });
  });
})(jQuery);

