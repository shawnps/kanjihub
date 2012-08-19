/**
 * @fileOverview
 * View that manages and renders the Search bar.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'templates/search_bar'
],
/**
 * @returns {Backbone.View}
 */
function($, _, Backbone, tpl) {
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
    },

    /**
     * @public
     * @returns {Backbone.View}
     */
    render: function () {
      this.$el.html(this.template({
        query: 'カン'
      }));

      return this;
    },

    // EVENT HANDLERS

    /**
     * Relays the click event with the input value.
     */
    onSubmit: function (e) {
      var searchTerm = this.$('.kanji-search-input').val();
      this.trigger('searchSubmit', searchTerm);
      e.preventDefault();
    }

  });

  return SearchBarView;
});
