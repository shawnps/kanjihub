/**
 * @fileOverview
 * The main application entry point.
 */

define([
  'router'
],
function (Router) {
  'use strict';

  var initialize = function () {
    Router.initialize();
  };

  return {
    initialize: initialize
  };

});
