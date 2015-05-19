var vulcanize   = require('broccoli-vulcanize');
var pickFiles   = require('broccoli-static-compiler');
var mergeTrees  = require('broccoli-merge-trees');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

var polymerVulcanize = vulcanize('app', {
  input: 'elements.html',
  output: 'assets/vulcanized.html',
  csp: true,
  inline: true,
  strip: false,
  excludes: {
    imports: ["(^data:)|(^http[s]?:)|(^\/)"],
    scripts: ["(^data:)|(^http[s]?:)|(^\/)"],
    styles: ["(^data:)|(^http[s]?:)|(^\/)"]
  }
});

var polymer = pickFiles('bower_components/', {
  srcDir: '',
  files: [
    'webcomponentsjs/webcomponents.js',
    'polymer/polymer.js',
    'polymer/polymer.html',
  ],
  destDir: '/assets'
});

//var vebanimation = pickFiles('bower_components/web-animations-js', {
//  srcDir: '',
//  files: [
//    'web-animations-next-lite.min.js.map;',
//  ],
//  destDir: '/assets'
//});

module.exports = mergeTrees([polymerVulcanize, polymer, app.toTree()]);
