/**
 * @fileOverview
 * View that manages and renders the About page.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/about.handlebars'
],
/**
 * @returns {Backbone.View}
 */
function($, _, Backbone, Handlebars, aboutTpl) {
  'use strict';

  var AboutView;

  /**
   * @constructor
   */
  AboutView = Backbone.View.extend({

    tagName: 'div',
    id: 'about-page',
    className: 'container-fluid',

    /**
     * @private
     */
    template: Handlebars.compile(aboutTpl),

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
