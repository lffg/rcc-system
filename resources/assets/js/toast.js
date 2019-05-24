/**
 * ---------------------------------------------------------------------
 * ToastPlugin System
 * ---------------------------------------------------------------------
 */

(function($, window) {
  'use strict';

  // Criar namespace global do System, caso não exista:
  window.Sys = window.Sys || {};

  /**
   * API pública para o uso e criação de toasts no System.
   *
   * @api @public
   * @param  {string} message
   * @param  {'success'|'warning'|'danger'|'info'} type
   * @return {void}
   */
  window.Sys.Toast =
    window.Sys.Toast ||
    function Toast(message, type, id) {
      var attributes = {
        className: '',
        icon: 'fa fa-info'
      };

      switch (type) {
        case 'success':
          attributes.className = '--success';
          attributes.icon = 'fa fa-check';
          break;
        case 'warning':
          attributes.className = '--warning';
          attributes.icon = 'fa fa-exclamation-circle';
          break;
        case 'danger':
          attributes.className = '--danger';
          attributes.icon = 'fa fa-exclamation-triangle';
          break;
        case 'info':
          attributes.className = '--info';
          attributes.icon = 'fa fa-info';
          break;
        default:
          console.log('Error.');
      }

      var $toast = $(
        [
          '<div class="--hidden sys-toast">',
          '  <div class="sys-toast-inner">',
          '    <i class="fa alert-icon ' + (attributes.icon || '') + '"></i>',
          '    <div>' + message + '</div>',
          '  </div>',
          '</div>'
        ].join('')
      )
        .addClass(attributes.className || '')
        .addClass(id || '');

      $toast.appendTo('.sys-toast-zone');
      setTimeout(function() {
        $toast.removeClass('--hidden');
        __init();
      }, 20);
    };

  /**
   * Cria uma barrinha de contagem.
   *
   * @param  {object <jQuery Element>} $context
   * @return {object<jQueryElement>}
   */
  function createBar($context) {
    var $bar = $('<span>', {
      class: 'sys-toast-bar'
    }).css('width', '100%');

    $bar.appendTo($context);
    return $bar;
  }

  /**
   * Inicia a animação de uma barrinha.
   *
   * @param  {object<jQuery Instance>} $toast
   * @param  {object<jQuery Instance>} $bar
   * @param  {number} duration
   * @return {void}
   */
  function animateBar($toast, $bar, duration) {
    $bar.animate(
      {
        width: '0%'
      },
      {
        duration: duration,
        easing: 'linear',
        complete: function() {
          $toast.addClass('--hidden');
          setTimeout(function() {
            $toast.find('.sys-toast-bar').remove();
            setTimeout(function() {
              $toast.remove();
            }, 20);
          }, 200);
        }
      }
    );
  }

  /**
   * Inicializa a atividade das toasts.
   *
   * @return {void}
   */
  function __init() {
    // Caso a tela seja muito pequena:
    if (window.innerWidth < 768) {
      $('.sys-toast').on('click', function() {
        var $this = $(this);
        $this.slideUp(200, function() {
          $this.remove();
        });
      });
      return;
    }

    $('.sys-toast').each(function() {
      var $this = $(this);

      if ($this.is(':hidden')) {
        return;
      }

      var text = $this.text().trim();
      var words = text.split(/\s/g).length;
      var time = words / 3.33 >= 7 ? words / 3.25 : 7;

      var $bar = $this.find('.sys-toast-bar');
      if (!$bar.length) {
        $bar = createBar($this);
        animateBar($this, $bar, time * 1000);
      }

      $this.on('mouseenter', function() {
        if ($this.is(':hidden')) {
          return;
        }

        $bar.stop();
        $bar.fadeOut(150, function() {
          $bar.remove();
        });
      });

      $this.on('mouseleave', function() {
        if ($this.find('.sys-toast-bar').length) {
          $this.find('.sys-toast-bar').remove();
          setTimeout(function() {
            $this.find('.sys-toast-bar').remove();
          }, 20);
        }

        $bar = createBar($this);
        animateBar($this, $bar, 1250);
      });

      $this.on('click', function() {
        $bar.stop();
        $this.addClass('--hidden');
        setTimeout(function() {
          $this.find('.sys-toast-bar').remove();
          setTimeout(function() {
            $this.remove();
          }, 20);
        }, 200);
      });
    });
  }

  $(function() {
    __init();
  });
})(jQuery, window);
