# Global Technology Solution

+ https://gtechsltn.github.io/
+ https://github.com/gtechsltn/gtechsltn.github.io/

# Ember.js
+ https://www.npmjs.com/package/ember-cli-sass
+ https://www.npmjs.com/package/@ember/jquery
+ https://www.npmjs.com/package/jquery/v/3.7.1
+ https://www.npmjs.com/package/bootstrap/v/3.4.1
+ https://www.npmjs.com/package/eonasdan-bootstrap-datetimepicker

```
ember new --no-welcome website
cd website

ember install ember-cli-sass

npm uninstall --save ember-cli-sass
npm install --save ember-cli-sass

npm uninstall --save-dev sass
npm install --save-dev sass

ember install @ember/jquery
npm install --save-dev jquery@^3.0
npm install --save-dev bootstrap@^3.0

npm install --save-dev eonasdan-bootstrap-datetimepicker
npm install --save-dev moment@^2.0
npm install --save-dev moment-timezone@^0.5

npm install --save-dev eonasdan-bootstrap-datetimepicker
```

## Setup Bootstrap 3 in Ember.js

ember-cli-build.js

```
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('node_modules/bootstrap/dist/js/bootstrap.min.js');
  app.import('node_modules/bootstrap/dist/css/bootstrap.min.css');

  return app.toTree();
};
```
