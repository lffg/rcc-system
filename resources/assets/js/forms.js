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
