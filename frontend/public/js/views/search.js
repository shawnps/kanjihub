/**
 * @fileOverview
 * View that manages and renders the Search page.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'templates/search',
  'collections/kanji',
  'views/search_bar',
  'views/search_results'
],
/**
 * @returns {Backbone.View}
 */
function($, _, Backbone, tpl, KanjiCollection, SearchBarView,
  SearchResultsView) {
  'use strict';

  var SearchView;

  /**
   * @constructor
   */
  SearchView = Backbone.View.extend({

    tagName: 'div',
    id: 'search-page',

    /**
     * @private
     */
    template: tpl,

    /**
     * @private
     */
    events: {
    },

    initialize: function () {
      // Bind all non-event handler methods to 'this'.
      _.bindAll(this, 'render', 'renderMain', 'renderSubView', 'onSearch');
      this.router = this.options.router;
      this.kanjiResults = new KanjiCollection();
      this.searchBarView = new SearchBarView();
      this.searchBarView.on('search', this.onSearch);
      this.searchResultsView = new SearchResultsView({
        router: this.router,
        collection: this.kanjiResults });
    },

    /**
     * @public
     * @returns {Backbone.View}
     */
    render: function () {
      this.renderMain();
      this.renderSubView(this.searchBarView);
      this.renderSubView(this.searchResultsView);
      return this;
    },

    /**
     * Renders the main content of the search page not including sub views.
     */
    renderMain: function () {
      this.$el.html(this.template({
        title: 'Kanji Search'
      }));
    },

    /**
     * Renders subviews within the main view.
     */
    renderSubView: function (subView) {
      var selector = '.' + subView.className;
      this.$(selector, this.$el).replaceWith(subView.render().$el);
    },

    // EVENT HANDLERS
    onSearch: function (searchTerm) {
      this.kanjiResults.setSearchTerm(searchTerm);
      this.kanjiResults.fetch();
    }


  });

  return SearchView;
});
