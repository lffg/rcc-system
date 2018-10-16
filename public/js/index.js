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

      if (!!$selector.attr('data-find-param')) {
        param = $selector.attr('data-find-param').trim().toUpperCase();
      } else {
        param = $selector.text().trim().toUpperCase();
      }

      $selector.toggle(param.indexOf(value.toUpperCase().trim()) !== -1);
    });
  });
})(jQuery);

/**
 * ---------------------------------------------------------------------
 * JavaScript Button
 * ---------------------------------------------------------------------
 */

(function ($) {
  'use strict';

  $(function () {
    $(document).on('submit', 'form', function () {
      var $button = $(this).find('.js-submit').not('input');
      var oldHTML = $button.html();

      $button.attr('data-old-html', oldHTML).html([
        '<i class="fa fa-spinner fa-spin"></i>',
        'Carregando...'
      ].join('\n'));
    });
  });
})(jQuery);

/**
 * ---------------------------------------------------------------------
 * Form Validator
 * ---------------------------------------------------------------------
 */

(function($) {
  'use strict';

  $(function () {
    $('[required]').parents('form').each(function () {
      var $form = $(this);
      var $fields = $form.find('[required]');

      $fields.removeAttr('required');

      if ($form.is('[data-do-not-validate="true"]')) {
        return;
      }

      $form.on('submit', function (event) {
        $fields.each(function () {
          var $field = $(this);

          if (!$field.val()) {
            event.preventDefault();

            if ($field.is('.is-invalid')) {
              return;
            }

            $field
              .attr('data-is-invalid', 'true')
              .addClass('is-invalid');

            if (!$field.next('span.invalid-feedback').length) {
              $field.after('<span class="invalid-feedback">Este campo é obrigatório.</span>');
            }
          }
        });

        if (!$form.find('[data-is-invalid]').length) {
          return;
        }

        var $button = $form.find('.js-submit');
        setTimeout(function () {
          $button.html($button.attr('data-old-html'));
        }, 75);
      });
    });
  });
})(jQuery);

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
      if (! $('body').is('.menu-shown')) return;

      event.preventDefault();
      toggleMenu(false);
    });

    $menu.on('click', function (event) {
      event.stopPropagation();
    });

    $menu.find('.sys-menu-nav ul li').each(function () {
      const $this = $(this);

      if (! $this.find('ul.submenu').length) return;

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

// /**
//  * ---------------------------------------------------------------------
//  * An easy access button that allows a quick return to the top of the page.
//  * ---------------------------------------------------------------------
//  *
//  * @author Kyo Panda (ajuda.forumeiros.com)
//  * @license MIT
//  *
//  */

// (function($) {
//   'use strict';

//   $(function() {
//     var $body = $('html, body');

//     var $link = $('<a>', {
//       href: 'javascript:void(0)',
//       id: 'sys-scrolltop',
//       html: '<i class="fa fa-angle-up"></i><span>Voltar ao Topo</span>'
//     })
//     .on('click', function() {
//       $body.stop().animate({ scrollTop: 0 }, 'fast');
//     })
//     .appendTo('body');

//     $(window).on('scroll', function() {
//       $link.toggleClass('sys-scrolltop-visible', $(this).scrollTop() !== 0);
//     });
//   });
// }(jQuery));

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
    } catch (e) {}
  });
})(jQuery);

/**
 * ---------------------------------------------------------------------
 * Select
 * ---------------------------------------------------------------------
 */

(function($) {
  'use strict';

  $(function() {
    if (! $('.sys-select-menu-wrapper').length) return false;

    $('.sys-select-menu-wrapper').each(function () {
      var $wrapper = $(this);
      var $input   = $wrapper.find('.sys-select-input');
      var $menu    = $wrapper.find('.sys-select-menu');

      if (! $input || ! $menu) {
        throw new Error('O elemento wrapper deve ter `input` e `menu` elementos.');
      }

      $menu.html([
        '<header class="sys-select-label">',
        '  Use o campo acima para filtrar ícones pelo atributo classe.',
        '</header>',
        '<div class="sys-select-menu-items">', $menu.html(), '</div>'
      ].join(''));

      var toggle = function () {
        $menu.find('.sys-select-item').each(function () {
          var $this = $(this);

          if ($this.attr('data-empty-control') !== 'true') {
            $this.toggle($this.attr('data-text').indexOf($input.val()) !== -1);
          }

          $this.on('click', function () {
            $input.val($this.attr('data-text'));
            $menu.hide();
          });
        });
      };

      toggle();

      $(document).on('click', function (event) {
        if ($menu.is(':hidden')) return;

        event.preventDefault();
        event.stopPropagation();
        $menu.hide();
      });

      $.each([$input, $menu], function () {
        this.on('click', function (event) {
          event.stopPropagation();
        });
      });

      $input.on('focus', function (event) {
        $menu.show();
      });

      $input.on('keyup', function () {
        toggle();
      });
    });
  });
})(jQuery);

/**
 * ---------------------------------------------------------------------
 * Username Checker
 * ---------------------------------------------------------------------
 */

(function ($, debounce) {
  'use strict';

  var API_URL    = '/api/check-user';

  function addNext ($el, message, className) {
    if (! message) {
      $el.next('.js-response-tooltip').remove();
    }

    if ($el.next().is('.js-response-tooltip')) {
      $el.next().remove();
    }

    if (className !== 'valid' && className !== 'invalid') {
      className = 'invalid';
    }

    $el.after([
      '<span class="js-response-tooltip ' + className + '-tooltip">',
      '  <span>' + message + '</span>',
      '</span>'
    ].join(''));
  }

  function danger ($el, message) {
    $el.removeClass('is-valid js-loading').addClass('is-invalid');
    addNext($el, 'Este usuário não existe.', 'invalid');
  }

  function success ($el) {
    $el.removeClass('is-invalid js-loading').addClass('is-valid');
    addNext($el, false);
  }

  $(function () {
    $('.js-username').each(function () {
      var $this = $(this);

      $this.on('keydown change focus', function () {
        if (! /\S/gi.test($this.val())) {
          $this.removeClass('js-loading is-invalid is-valid')
          return;
        }

        if (! $this.is('.js-loading')) {
          $this.addClass('js-loading');
        }
      });

      $this.on('keydown change focus', debounce(function () {
        if (! /\S/gi.test($this.val())) {
          $this.removeClass('js-loading is-invalid is-valid')
          return;
        }

        $.get(API_URL, {
          u: $this.val(),
          _: Date.now()
        })
          .done(function (response) {
            success($this);
          })
          .fail(function (errorResponse) {
            if (errorResponse.status === 404) {
              return danger($this, 'Este usuário não existe.');
            }

            danger($this, 'Houve um erro interno.');
          });
      }, 300));
    });

    $('<style>', { 'text': [
      '.js-username.js-loading {',
      '  background-image: url(/icons/loading.gif);',
      '  background-size: 25px;',
      '  background-position-y: center;',
      '  background-position-x: calc(100% - .5rem);',
      '  background-repeat: no-repeat;',
      '}'
    ].join('') }).appendTo('head');
  });
})(jQuery, function debounce (func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (! immediate) func.apply(context, args);
    };
    var callNow = immediate && ! timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
});
