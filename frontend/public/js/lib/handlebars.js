/**
 * @fileOverview
 * A simple wrapper for Handlebars that adds custom helpers to it.
 */

define([
  '../extern/handlebars/handlebars'
],
function(Handlebars) {
  'use strict';

  Handlebars.registerHelper('ifequal', function (val1, val2, fn, elseFn) {
    if (val1 === val2) {
      return fn();
    }
    if (elseFn) {
      return elseFn();
    }
  });

  return Handlebars;
});
