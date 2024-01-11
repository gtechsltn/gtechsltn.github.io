'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
  });

  // Bootstrap 3 CSS
  app.import('node_modules/bootstrap/dist/css/bootstrap.min.css');

  // Bootstrap 3 Glyphicons: BEGIN
  // ----------------------------------------------------------------

  // Bootstrap 3 Glyphicons: glyphicons-halflings-regular.ttf
  app.import('node_modules/bootstrap/fonts/glyphicons-halflings-regular.ttf', {
    destDir: 'fonts',
  });

  // Bootstrap 3 Glyphicons: glyphicons-halflings-regular.woff
  app.import('node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff', {
    destDir: 'fonts',
  });

  // Bootstrap 3 Glyphicons: glyphicons-halflings-regular.woff2
  app.import(
    'node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff2',
    {
      destDir: 'fonts',
    },
  );

  // ----------------------------------------------------------------
  // Bootstrap 3 Glyphicons: END

  // Font Awesome 4.7.0: BEGIN
  // ----------------------------------------------------------------
  app.import('node_modules/font-awesome/css/font-awesome.min.css');

  // Font Awesome 4.7.0: fontawesome-webfont.ttf
  app.import('node_modules/font-awesome/fonts/fontawesome-webfont.ttf', {
    destDir: 'fonts',
  });

  // Font Awesome 4.7.0: fontawesome-webfont.woff
  app.import('node_modules/font-awesome/fonts/fontawesome-webfont.woff', {
    destDir: 'fonts',
  });

  // Font Awesome 4.7.0: fontawesome-webfont.woff2
  app.import('node_modules/font-awesome/fonts/fontawesome-webfont.woff2', {
    destDir: 'fonts',
  });

  // ----------------------------------------------------------------
  // Font Awesome 4.7.0: END

  // Bootstrap 3 JS
  app.import('node_modules/bootstrap/dist/js/bootstrap.min.js');

  // Bootstrap 3 Datetimepicker
  app.import(
    'node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
  );

  // Alpaca: BEGIN
  // ----------------------------------------------------------------

  app.import('vendor/alpaca/bootstrap/alpaca.js');
  app.import('vendor/alpaca/bootstrap/alpacaEx.css');
  app.import('vendor/alpaca/bootstrap/alpaca.css');

  // ----------------------------------------------------------------
  // Alpaca: END

  return app.toTree();
};
