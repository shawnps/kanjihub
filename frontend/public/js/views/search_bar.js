/**
 * @fileOverview
 * View that manages and renders the Search bar.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'models/query',
  'templates/search_bar'
],
/**
 * @returns {Backbone.View}
 */
function($, _, Backbone, QueryModel, tpl) {
  'use strict';

  var SearchBarView;

  /**
   * @constructor
   */
  SearchBarView = Backbone.View.extend({

    /**
     * @private
     */
    template: tpl,

    /**
     * @private
     */
    events: {
      'submit .kanji-search-form': 'onSubmit'
    },

    initialize: function () {
      // Bind all non-event handler methods to 'this'.
      _.bindAll(this, 'render', 'onSubmit');
      this.router = this.options.router;
      this.query = this.model;
      this.query.on('change', this.render);
    },

    /**
     * @public
     * @returns {Backbone.View}
     */
    render: function () {
      this.$el.html(this.template({
        query: this.query.toJSON()
      }));

      if (this.query.isEmpty()) {
        this.$('.search-query').focus();
      }
      return this;
    },

    /**
     * Updates the query model based on the user's input.
     */
    updateQuery: function () {
      var searchTerm = this.$('.search-query').val();
      this.query.setSearchTerm(searchTerm);
      this.query.trigger('change');
    },

    // EVENT HANDLERS

    /**
     * Relays the click event with the input value.
     */
    onSubmit: function (e) {
      this.updateQuery();
      e.preventDefault();
    }

  });

  return SearchBarView;
});
