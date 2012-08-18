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

    baseUrl: '/api/search/',
    url: '',
    model: KanjiModel,
    searchTerm: '',

    /**
     * @public
     */
    setSearchTerm: function (searchTerm) {
      this.searchTerm = searchTerm;
      // TODO: logic for onyomi/kunyomi etc
      this.url = this.baseUrl + 'onyomi/' + searchTerm;
    }

  });

  return Kanji;
});
