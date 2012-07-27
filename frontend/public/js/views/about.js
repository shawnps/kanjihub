/**
 * @fileOverview
 * View that manages and renders the About page.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'templates/about'
],
/**
 * @returns {Backbone.View}
 */
function($, _, Backbone, aboutTpl) {
  'use strict';

  var AboutView;

  /**
   * @constructor
   */
  AboutView = Backbone.View.extend({

    tagName: 'div',
    id: 'about-page',

    /**
     * @private
     */
    template: aboutTpl,

    /**
     * @private
     */
    events: {
    },

    initialize: function () {
      _.bindAll(this, 'render');
    },

    /**
     * @public
     * @returns {Backbone.View}
     */
    render: function () {
      this.$el.html(this.template({
      }));

      return this;
    }

  });

  return AboutView;

});
