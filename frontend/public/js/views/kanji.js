/**
 * @fileOverview
 * View that manages and renders the Kanji Detail page.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'templates/kanji'
],
/**
 * @returns {Backbone.View}
 */
function($, _, Backbone, tpl) {
  'use strict';

  var KanjiView;

  /**
   * @constructor
   */
  KanjiView = Backbone.View.extend({

    tagName: 'div',
    id: 'kanji-detail-page',

    /**
     * @private
     */
    template: tpl,

    /**
     * @private
     */
    events: {
      'click table.reading > tbody': 'onReadingClick'
    },

    initialize: function () {
      _.bindAll(this, 'render', 'remove');
      this.router = this.options.router;
      this.model.on('change', this.render);
      this.model.fetch();
    },

    /**
     * @public
     * @returns {Backbone.View}
     */
    render: function () {
      if (!this.model) {
        return;
      }
      this.$el.html(this.template({
        kanji: this.model.toJSON()
      }));

      return this;
    },

    // EVENT HANDLERS

    onReadingClick: function (e) {
      var searchTerm = this.$(e.target).text();
      this.router.navigate(
        'search/' +
        searchTerm,
        {trigger: true});
      e.preventDefault();
    }

  });

  return KanjiView;
});
