/**
 * ---------------------------------------------------------------------
 * Security
 * ---------------------------------------------------------------------
 */

(function ($) {
  'use strict';

  $(document).ajaxComplete(function (event, response) {
    try {
      var json = JSON.parse(response.responseText);

      if (json.reload === true) {
        window.location.reload(true);
      }
    } catch (e) {
      // Do stuff.
    }
  });
})(jQuery);
