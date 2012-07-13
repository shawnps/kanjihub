/**
 * @fileOVerview
 * The main applicatoin Router.
 * Defines routes, initializes and renders views.
 */

define([
  'backbone',
  'views/nav',
  'views/home',
  'views/about',
  'views/kanji'
],
/**
 * @returns {Backbone.Router}
 */
function(Backbone, NavView, HomeView, AboutView, KanjiView) {
  'use strict';

  var AppRouter;

  /**
   * @constructor
   */
  AppRouter = Backbone.Router.extend({

    routes: {
      '': 'home',
      'about': 'about',
      'kanji/:character': 'kanji',
      // Default
      '*actions': 'defaultAction'
    },

    /**
     * Initializes all the views used by the app at load time.
     * @param {Object} options
     */
    initialize: function (options) {
      this.navView = new NavView({ router: this });
      this.homeView = new HomeView({ router: this });
      this.aboutView = new AboutView();
      this.kanjiView = new KanjiView();
    },

    home: function () {
      this.homeView.render();
    },

    about: function () {
      this.aboutView.render();
    },

    kanji: function (character) {
      this.kanjiView.render(character);
    },

    defaultAction: function (actions) {
      // No route.
      this.navigate('home', { trigger: true, replace: true });
    }

  });

  return {
    initialize: function () {
      var appRouter = new AppRouter();
      Backbone.history.start({ pushState: true });
    }
  };

});
