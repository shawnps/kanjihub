/**
 * @fileOVerview
 * Bootstraps RequireJS.
 * Sets up any special configuration for external modules, and initializes
 * the main application.
 */

require.config({
  paths: {
    'templates':            '../templates',
    'text':                 '../extern/require/text',
    'jquery':               '../extern/jquery/jquery-1.7.2.min',
    'backbone':             '../extern/backbone/backbone',
    'underscoreBase':       '../extern/underscore/underscore',
    'underscore':           'lib/underscore',
    'handlebars':           'lib/handlebars',
    // Bootstrap plugins
    'bootstrapAlert':       '../extern/bootstrap/js/bootstrap-alert',
    'bootstrapButton':      '../extern/bootstrap/js/bootstrap-button',
    'bootstrapCarousel':    '../extern/bootstrap/js/bootstrap-carousel',
    'bootstrapCollapse':    '../extern/bootstrap/js/bootstrap-collapse',
    'bootstrapDropdown':    '../extern/bootstrap/js/bootstrap-dropdown',
    'bootstrapModal':       '../extern/bootstrap/js/bootstrap-modal',
    'bootstrapPopover':     '../extern/bootstrap/js/bootstrap-popover',
    'bootstrapScrollspy':   '../extern/bootstrap/js/bootstrap-scrollspy',
    'bootstrapTab':         '../extern/bootstrap/js/bootstrap-tab',
    'bootstrapTooltip':     '../extern/bootstrap/js/bootstrap-tooltip',
    'bootstrapTransition':  '../extern/bootstrap/js/bootstrap-transition',
    'bootstrapTypeahead':   '../extern/bootstrap/js/bootstrap-typeahead'
  },
  // Load modules that don't natively support AMD.
  shim: {
    'underscoreBase': {
      deps: [],
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    // Boostrap Plugins
    'bootstrapAlert':       ['jquery'],
    'bootstrapButton':      ['jquery'],
    'bootstrapCarousel':    ['jquery'],
    'bootstrapCollapse':    ['jquery'],
    'bootstrapDropdown':    ['jquery'],
    'bootstrapModal':       ['jquery'],
    'bootstrapPopover':     ['jquery'],
    'bootstrapScrollspy':   ['jquery'],
    'bootstrapTab':         ['jquery'],
    'bootstrapTooltip':     ['jquery'],
    'bootstrapTransition':  ['jquery'],
    'bootstrapTypeahead':   ['jquery']
  }
});

require(['app'], function(App) {
  'use strict';
  App.initialize();
});
