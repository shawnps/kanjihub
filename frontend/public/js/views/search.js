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
      // Bind all methods to 'this'.
      _.bindAll(this,
        'render',
        'renderMain',
        'renderSearchBar',
        'renderResults',
        'onQueryChange');
      this.router = this.options.router;
      this.searchBarView = new SearchBarView({ model: this.model });
      this.kanjiResults = new KanjiCollection();
      this.resultsView = new SearchResultsView({
        router: this.router,
        collection: this.kanjiResults });
      this.model.on('change', this.onQueryChange);
      this.kanjiResults.on('reset', _.bind(function () {
        this.renderResults();
      }, this));
    },

    /**
     * @public
     * @returns {Backbone.View}
     */
    render: function () {
      this.renderMain();
      this.resultsContainerEl = this.$('.search-results-container');
      this.searchBarContainerEl = this.$('.search-bar-container');
      this.renderSearchBar();
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
     * Renders the search bar view to the container element.
     */
    renderSearchBar: function () {
      this.searchBarView.setElement(this.searchBarContainerEl);
      this.searchBarView.render();
    },

    /**
     * Renders the search results view to the container element.
     */
    renderResults: function (msg) {
      // turn loading off
      this.resultsView.setElement(this.resultsContainerEl);
      this.resultsView.render(msg);
    },

    // EVENT HANDLERS

    onQueryChange: function () {
      this.kanjiResults.reset(null, {silent: true});
      this.renderResults('Loading...');
      this.kanjiResults.updateUrl(this.model);
      this.kanjiResults.fetch();
    }

  });

  return SearchView;
});
