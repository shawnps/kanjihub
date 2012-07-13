/**
 * @fileOverview
 * A simple wrapper for Underscore.js that adds custom mixins to it.
 */

define([
  'underscoreBase',
  '../extern/underscore/underscore.string'
],
function(_, _s) {
  'use strict';

  /**
   * Adds underscore string.
   * @see http://epeli.github.com/underscore.string/
   */
  _.str = _s;
  _.mixin(_s.exports());
  _.str.include('Underscore.string', 'string');

  return _;
});
