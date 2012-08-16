/**
 * @fileOverview
 * A simple wrapper for Handlebars that adds custom helpers to it.
 */

define([
  'handlebarsBase'
],
function (Handlebars) {
  'use strict';

  Handlebars.registerHelper('ifequal', function (val1, val2, options) {
    var fn = options.fn;
    if (val1 === val2) {
      return fn();
    }
  });

  return Handlebars;
});
