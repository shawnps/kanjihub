/**
 * @fileOVerview
 * Model that represents the details of a kanji character.
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

  var Kanji;

  /**
   * @constructor
   */
  Kanji = Backbone.Model.extend({

    defaults: {
      literal: '',
      onYomi: [],
      kunYomi: [],
      strokes: 0,
      jlpt: 0,
      grade: 0,
      freq: 0,
      meanings: []
    },

    urlRoot: '/api/kanji',

    /**
     * @public
     */
    initialize: function () {
    }

  });

  return Kanji;
});
