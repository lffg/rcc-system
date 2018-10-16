var config = {
  keyCodes: [13, 32],
  tagTemplate: '<span class="tagsinput__tag badge badge-dark px-2 py-1 mb-3 mr-2">${value}</span>'
};

$('[data-toggle="tagsinput"]').each(function (i, el) {
	// Wrapper template:
	var $wrapper = $([
  	'<div class="tagsinput">',
    '  <div class="tagsinput__tags"></div>',
    '  <div class="tagsinput__meta" style="display: none;"></div>',
    '</div>'
  ].join('\n'));

  // Others elements:
  var $tagsZone = $wrapper.find('.tagsinput__tags');
  var $metaZone = $wrapper.find('.tagsinput__meta');
  var $input = $(el);

  // Create a field name:
  var name = createFieldName();

  // Insert the wrapper into the DOM:
  $wrapper.insertAfter($input);

  $input
  	.appendTo($wrapper)
    .addClass('tagsinput__input')
    .on('keydown', onKeyup);

  function createFieldName () {
    if (! $input.attr('name')) {
      throw new Error('You must provide a name attribute to the tagsinput field.', $input);
    }

    var name = $input.attr('name');

    if (! /\[.*?\]$/.test(name)) {
      console.info('The "name" attribute of the tagsinput field has changed from ' + name + ' to ' + name + '[].');
      name += '[]';
    }

    $input.removeAttr('name');

    return name;
  }

  function onKeyup (event) {
  	if (config.keyCodes.indexOf(event.keyCode) !== -1) {
      event.preventDefault();
    	createTag($(this).val(), updateValue);
      $(this).val('');
    }

    if (event.keyCode === 8 && $(this).val() === '') {
      deleteTag(updateValue);
    }
  }

  function createTag (value, callback) {
    // XSS-free:
    value = $('<span>').text(value).html().trim();
    var $tag = $(config.tagTemplate.replace(/\${value}/g, value))
      .attr('data--value', value)
      .attr('data--l-value', value.toLowerCase());

    if (! value) return;
    var $possible = $tagsZone.children('[data--l-value="' + value.toLowerCase() + '"]');

    // If the tag already exists:
    if ($possible.length) {
      return $possible.hide().fadeIn();
    }

    $tagsZone.append($tag);
    callback();
  }

  function deleteTag (callback) {
    var $lastTag = $tagsZone.children('[data--value]').last();
    if (! $lastTag.length) return;

    $lastTag.remove();
    callback();
  }

  function updateValue () {
    var values = [];

    $tagsZone.children('[data--value]').each(function () {
      values.push($(this).attr('data--value'));
    });

    $metaZone.html('');

    $.each(values, function (index, value) {
      var $field = $('<input />');
      $field.attr('type', 'hidden');
      $field.attr('name', name);
      $field.attr('value', value);
      $field.appendTo($metaZone);
    });
  }
});
