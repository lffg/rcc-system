(function ($) {
  'use strict';

  // Caso a tela seja muito pequena:
  if (window.innerWidth < 768) {
    return;
  }

  /**
   * Cria uma barrinha de contagem.
   *
   * @param  {object <jQuery Element>} $context
   * @return {object<jQueryElement>}
   */
  function createBar ($context) {
    var $bar = $('<span>', {
      'class': 'sys-toast-bar'
    })
      .css('width', '100%');

    $bar.appendTo($context);
    return $bar;
  }

  function animateBar ($toast, $bar, duration) {
    $bar.animate({
      width: '0%'
    }, {
      duration: duration,
      easing: 'linear',
      complete: function () {
        $toast.addClass('--hidden');
        setTimeout(function () {
          $toast.find('.sys-toast-bar').remove();
        }, 200);
      }
    });
  }

  $(function () {
    $('.sys-toast').each(function () {
      var $this = $(this);

      if ($this.is(':hidden')) {
        return;
      }

      var text = $this.text().trim();
      var words = text.split(/\s/g).length;
      var time = (words / 3.33) >= 7 ? words / 3.25 : 7;

      var $bar = createBar($this);
      animateBar($this, $bar, (time * 1000));

      $this.on('mouseenter', function () {
        if ($this.is(':hidden')) {
          return;
        }

        $bar.stop();
        $bar.fadeOut(150, function () {
          $this.find('.sys-toast-bar').remove();
        });
      });

      $this.on('mouseleave', function () {
        $bar = createBar($this);
        animateBar($this, $bar, 1250);
      });

      $this.on('click', function () {
        $bar.stop();
        $this.addClass('--hidden');
        setTimeout(function () {
          $this.find('.sys-toast-bar').remove();
        }, 200);
      });
    });
  });
})(jQuery);
