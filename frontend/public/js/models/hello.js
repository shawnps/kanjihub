/**
 * @fileOVerview
 * A sample Backbone Model.
 */

define([
  'underscore',
  'backbone'
],

/**
 * @returns {Backbone.Model}
 */
function(_, Backbone) {
  'use strict';

  var Hello;

  /**
   * @constructor
   */
  Hello = Backbone.Model.extend({

    defaults: {
      text: 'hello'
    },

    /**
     * @public
     */
    initialize: function () {
    }

  });

  return Hello;
});
