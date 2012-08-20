/**
 * @fileOverview
 * View that manages and renders the Search results.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'templates/search_results'
],
/**
 * @returns {Backbone.View}
 */
function($, _, Backbone, tpl) {
  'use strict';

  var SearchResultsView;

  /**
   * @constructor
   */
  SearchResultsView = Backbone.View.extend({

    /**
     * @private
     */
    template: tpl,

    /**
     * @private
     */
    events: {
      'click .kanji': 'onKanjiClick'
    },

    initialize: function () {
      // Bind all non-event handler methods to 'this'.
      _.bindAll(this, 'render');
      this.router = this.options.router;
    },

    /**
     * @public
     * @returns {Backbone.View}
     */
    render: function (msg) {
      var message = msg || '';
      if (!msg && !this.collection.length) {
        message = 'No results found.';
      }
      this.$el.html(this.template({
        results: this.collection.toJSON(),
        message: message
      }));
      return this;
    },

    // EVENT HANDLERS

    /**
     * @private
     * @param {Event} e
     */
    onKanjiClick: function (e) {
      this.router.navigate(
        '/kanji/' + e.target.innerText,
        { trigger: true });
      e.preventDefault();
    }

  });

  return SearchResultsView;
});
