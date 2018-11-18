/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 * @see http://docs.ckeditor.com/#!/api/CKEDITOR.config
 */

CKEDITOR.editorConfig = function( config ) {
  config.toolbarGroups = [
    { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
    { name: 'forms', groups: [ 'forms' ] },
    { name: 'tools', groups: [ 'tools' ] },
    { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
    { name: 'others', groups: [ 'others' ] },
    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
    { name: 'colors', groups: [ 'colors' ] },
    { name: 'links', groups: [ 'links' ] },
    { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
    { name: 'insert', groups: [ 'insert' ] },
    { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
    '/',
    { name: 'styles', groups: [ 'styles' ] },
    { name: 'about', groups: [ 'about' ] }
  ];

  config.removePlugins = 'contextmenu';

  config.contentsCss = [[
    'body {',
      'font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;',
      'font-size: 15px;',
      'color: #333;',
      'background-color: #fff;',
      'margin: 20px;',
    '}',
    '',
    '.cke_reset_all * {',
      'font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif !important;',
    '}'
  ].join('')];

  config.removeButtons = 'Anchor,Paste,Copy,Cut,BGColor,Subscript,Superscript,PasteText';
	config.format_tags = 'p;h1;h2;h3;pre';
	config.removeDialogTabs = 'link:target;link:advanced;image:Link;image:advanced';
};

(function () {
  var el = document.createElement('style');
  el.innerText = [
    '/** CKEditor Custom Styles. */',
    '.cke_top { border-bottom-color: #d0d0d0 !important; }',
    '.cke { border-color: #d0d0d0 !important; border-radius: .25rem !important; overflow: hidden !important; } '
  ].join('');
  document.head.appendChild(el);
})();
