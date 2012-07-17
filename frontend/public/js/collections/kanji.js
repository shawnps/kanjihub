/**
 * @fileOVerview
 * Collection of Kanji character models.
 */

define([
  'underscore',
  'backbone',
  'models/kanji'
],
/**
 * @returns {Backbone.Collection}
 */
function(_, Backbone, KanjiModel){
  'use strict';

  var Kanji;

  /**
   * @private
   */
  function myPrivate() {
    // do private stuff
  }

  /**
   * @constructor
   */
  Kanji = Backbone.Collection.extend({

    model: KanjiModel,

    /**
     * @public
     */
    helperFunction: function () {
      // do public stuff
      return true;
    }

  });

  return Kanji;
});
