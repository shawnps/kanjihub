/**
 * @fileOverview
 * View that manages and renders the Kanji Detail page.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/kanji.handlebars'
],
/**
 * @returns {Backbone.View}
 */
function($, _, Backbone, Handlebars, tpl) {
  'use strict';

  var KanjiView;

  /**
   * @constructor
   */
  KanjiView = Backbone.View.extend({

    /**
     * @private
     */
    template: Handlebars.compile(tpl),

    /**
     * @private
     */
    events: {
    },

    el: $('#main-container'),

    initialize: function () {
      _.bindAll(this, 'render');
    },

    /**
     * @public
     * @returns {Backbone.View}
     */
    render: function (character) {
      this.$el.html(this.template({
        character: character
      }));

      return this;
    }

  });

  return KanjiView;
});
