(function($) {
  'use strict';

  if (!/^#\$tab\/(.+)$/i.test(location.hash)) {
    return;
  }

  var hash = location.hash.replace(/^#\$tab\/(.+)$/i, '$1');

  $(function() {
    var $tab = $('[data-toggle="tab"][href="#' + hash + '"]');

    if (!$tab.length) {
      return;
    }

    $tab.tab('show');
    location.hash = '#';
  });
})(jQuery);
