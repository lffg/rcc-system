(function ($) {
  'use strict';

  if (!/^#\$tab\/(.+)$/i.test(window.location.hash)) {
    return;
  }

  var hash = window.location.hash.replace(/^#\$tab\/(.+)$/i, '$1');

  $(function () {
    var $tab = $('[data-toggle="tab"][href="#' + hash + '"]');

    if (!$tab.length) {
      return;
    }

    $tab.tab('show');
    window.location.hash = '#';
  });
})(jQuery);
