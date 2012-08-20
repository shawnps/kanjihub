/**
 * @fileOVerview
 * Collection of Kanji character models.
 */

define([
  'underscore',
  'backbone',
  'models/kanji',
  'models/query'
],
/**
 * @returns {Backbone.Collection}
 */
function(_, Backbone, KanjiModel, QueryModel) {
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
    query: null,

    initialize: function () {
      _.bindAll(this,
        'updateUrl');
    },

    /**
     * @public
     */

    /**
     * Updates the fetch url based on the query state.
     * @private
     */
    updateUrl: function (query) {
      this.url = this.baseUrl +
        query.get('readingType') + '/' +
        query.get('searchTerm');
    }

    // EVENT HANDLERS

  });

  return Kanji;
});
