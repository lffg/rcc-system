/**
 * ---------------------------------------------------------------------
 * Filter
 * ---------------------------------------------------------------------
 */

(function ($) {
  'use strict';

  $('body').on('keyup', '[data-find-field]', function () {
    var $field = $(this);
    var $selectors = $($field.attr('data-find-selector'));
    var value = $field.val();

    if (!$selectors.length) {
      return;
    }

    $selectors.each(function () {
      var $selector = $(this);
      var param;

      if ($selector.attr('data-find-param')) {
        param = $selector.attr('data-find-param').trim().toUpperCase();
      } else {
        param = $selector.text().trim().toUpperCase();
      }

      $selector.toggle(param.indexOf(value.toUpperCase().trim()) !== -1);
    });
  });
})(jQuery);
