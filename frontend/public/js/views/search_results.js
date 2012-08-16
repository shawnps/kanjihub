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

    tagName: 'div',
    className: 'search-results',

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
    render: function () {
      this.$el.html(this.template({
        //query: 'fake query'
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
