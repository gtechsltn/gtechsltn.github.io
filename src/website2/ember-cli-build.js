'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('node_modules/bootstrap/dist/js/bootstrap.min.js');
  app.import('node_modules/bootstrap/dist/css/bootstrap.min.css');

  app.import('node_modules/bootstrap/fonts/glyphicons-halflings-regular.ttf', {
    destDir: 'fonts',
  });
  app.import(
    'node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff2',
    { destDir: 'fonts' },
  );
  app.import('node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff', {
    destDir: 'fonts',
  });
  app.import(
    'node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
  );

  return app.toTree();
};
