# Global Technology Solution

+ https://gtechsltn.github.io/
+ https://github.com/gtechsltn/gtechsltn.github.io/

# Ember.js
+ https://www.npmjs.com/package/ember-cli-sass
+ https://www.npmjs.com/package/@ember/jquery
+ https://www.npmjs.com/package/jquery/v/3.7.1
+ https://www.npmjs.com/package/bootstrap/v/3.4.1
+ https://www.npmjs.com/package/eonasdan-bootstrap-datetimepicker
  + https://www.npmjs.com/browse/depended/eonasdan-bootstrap-datetimepicker
  + https://www.npmjs.com/package/gzkras-ember-cli-bootstrap-datetimepicker
    + https://github.com/jasonmit/ember-cli-moment-shim
    + ember install ember-cli-moment-shim
    + https://github.com/Eonasdan/bootstrap-datetimepicker
      + https://github.com/monim67/bootstrap-datetimepicker
      + https://monim67.github.io/bootstrap-datetimepicker/
    + https://cdnjs.com/libraries/bootstrap-datetimepicker/4.17.47
  + https://github.com/Eonasdan/tempus-dominus
    + https://getdatepicker.com/6/installing.html
  + https://www.npmjs.com/package/ember-cli-bootstrap-datetimepicker
    + https://discuss.emberjs.com/t/ember-cli-bootstrap-datepicker-and-jquery-ui/9257
    + https://stackoverflow.com/questions/45122176/how-to-add-bootstrap-3-datepicker-to-angular-4-project

# Day.js (Alternatives to Moment.js)
+ https://www.npmjs.com/package/dayjs
+ https://mirzaleka.medium.com/the-complete-guide-to-day-js-fb835a5d945a

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

npm install --save-dev fontawesome-4.7
npm install --save-dev font-awesome@^4

ember install ember-cli-bootstrap-datetimepicker
npm install --save-dev eonasdan-bootstrap-datetimepicker@4.17.47
npm install --save-dev moment@^2.0
npm install --save-dev moment-timezone@^0.5

ember install ember-cli-moment-shim
npm install --save-dev moment
npm install --save-dev moment-timezone

```

## Setup SASS in Ember.js

+ Install ember-cli-sass
  + ember install ember-cli-sass
+ Rename app.css -> app.scss
  + from: \app\styles\app.css
  + to: \app\styles\app.scss

## Setup Bootstrap 3 in Ember.js

+ Download Bootstrap 3 from [link](https://getbootstrap.com/docs/3.4/getting-started/#download)
+ Unzip 'bootstrap-3.4.1-dist.zip' to %Temp%\bootstrap-3.4.1-dist\
+ Copy folder
  + from %Temp%\bootstrap-3.4.1-dist\fonts
  + to dist\fonts

ember-cli-build.js

```
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
  });

  // Bootstrap 3
  app.import('node_modules/bootstrap/dist/js/bootstrap.min.js');
  app.import('node_modules/bootstrap/dist/css/bootstrap.min.css');

  // Font Awesome 4.7.0: BEGIN
  // ----------------------------------------------------------------
  app.import('node_modules/fontawesome-4.7/css/font-awesome.min.css');

  // Font Awesome 4.7.0: fontawesome-webfont.ttf
  app.import('node_modules/fontawesome-4.7/fonts/fontawesome-webfont.ttf', {
    destDir: 'fonts',
  });

  // Font Awesome 4.7.0: fontawesome-webfont.woff
  app.import('node_modules/fontawesome-4.7/fonts/fontawesome-webfont.woff', {
    destDir: 'fonts',
  });

  // Font Awesome 4.7.0: fontawesome-webfont.woff2
  app.import('node_modules/fontawesome-4.7/fonts/fontawesome-webfont.woff2', {
    destDir: 'fonts',
  });

  // ----------------------------------------------------------------
  // Font Awesome 4.7.0: END

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

  // Bootstrap 3 Datetimepicker
  app.import(
    'node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
  );

  return app.toTree();
};
```

# Setup Font-Awesome 4.7.0 in Ember.js
+ https://www.npmjs.com/package/fontawesome-4.7
+ https://www.npmjs.com/package/font-awesome
