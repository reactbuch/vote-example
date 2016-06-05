import 'babel-polyfill';

// why this strange file?
// https://github.com/webpack/karma-webpack#alternative-usage
// to have a single build with all tests

// require all files ending in ".spec.js" from the
// current directory and all subdirectories
var testsContext = require.context('.', true, /.spec\.js$/);
testsContext.keys().forEach(testsContext);
