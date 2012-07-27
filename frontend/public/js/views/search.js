/**
 * @fileOverview
 * View that manages and renders the Search page.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'templates/search'
],
/**
 * @returns {Backbone.View}
 */
function($, _, Backbone, tpl) {
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
        title: 'Kanji Search'
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

  return SearchView;
});
