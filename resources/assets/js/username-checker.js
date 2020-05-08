/**
 * ---------------------------------------------------------------------
 * Username Checker
 * ---------------------------------------------------------------------
 */

(function ($, debounce) {
  'use strict';

  var API_URL = '/api/check-user';

  function addNext($el, message, className) {
    var currentClassName = className;

    if (!message) {
      $el.next('.js-response-tooltip').remove();
    }

    if ($el.next().is('.js-response-tooltip')) {
      $el.next().remove();
    }

    if (currentClassName !== 'valid' && currentClassName !== 'invalid') {
      currentClassName = 'invalid';
    }

    $el.after(
      [
        '<span class="js-response-tooltip ' + currentClassName + '-tooltip">',
        '  <span>' + message + '</span>',
        '</span>'
      ].join('')
    );
  }

  function danger($el) {
    $el.removeClass('is-valid js-loading').addClass('is-invalid');
    addNext($el, 'Este usuário não existe.', 'invalid');
  }

  function success($el) {
    $el.removeClass('is-invalid js-loading').addClass('is-valid');
    addNext($el, false);
  }

  $(function () {
    $('.js-username').each(function () {
      var $this = $(this);

      $this.on('keydown change focus', function () {
        if (!/\S/gi.test($this.val())) {
          $this.removeClass('js-loading is-invalid is-valid');
          return;
        }

        if (!$this.is('.js-loading')) {
          $this.addClass('js-loading');
        }
      });

      $this.on(
        'keydown change focus',
        debounce(function () {
          if (!/\S/gi.test($this.val())) {
            $this.removeClass('js-loading is-invalid is-valid');
            return;
          }

          $.get(API_URL, {
            u: $this.val(),
            _: Date.now()
          })
            .done(function () {
              success($this);
            })
            .fail(function (errorResponse) {
              if (errorResponse.status === 404) {
                return danger($this, 'Este usuário não existe.');
              }

              danger($this, 'Houve um erro interno.');
            });
        }, 300)
      );
    });

    $('<style>', {
      text: [
        '.js-username.js-loading {',
        '  background-image: url(/icons/loading.gif);',
        '  background-size: 25px;',
        '  background-position-y: center;',
        '  background-position-x: calc(100% - .5rem);',
        '  background-repeat: no-repeat;',
        '}'
      ].join('')
    }).appendTo('head');
  });
})(jQuery, function debounce(func, wait, immediate) {
  'use strict';

  var timeout;
  return function () {
    var context = this;
    var args = arguments; // eslint-disable-line prefer-rest-params
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
});
