/**
 * @fileOVerview
 * A sample Backbone Collection.
 */

define([
  'underscore',
  'backbone',
  'models/hello'
],
/**
 * @returns {Backbone.Collection}
 */
function(_, Backbone, Hello){
  'use strict';

  var Hellos;

  /**
   * @private
   */
  function myPrivate() {
    // do private stuff
  }

  /**
   * @constructor
   */
  Hellos = Backbone.Collection.extend({

    model: Hello,

    /**
     * @public
     */
    helperFunction: function () {
      // do public stuff
      return true;
    }

  });

  return Hellos;
});
