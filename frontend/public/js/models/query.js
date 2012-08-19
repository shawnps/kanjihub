/**
 * @fileOVerview
 * Model that contains all data related to a Query/Search.
 */

define([
  'underscore',
  'backbone'
],

/**
 * @returns {Backbone.Model}
 */
function(_, Backbone) {
  'use strict';

  var Query;

  /**
   * @constructor
   */
  Query = Backbone.Model.extend({

    defaults: {
      searchTerm: '',
      readingType: 'kunyomi',
      maxFreq: 3000
    },

    validReadingTypes: ['kunyomi', 'onyomi', 'romaji', 'kanji'],

    hiraganaRegEx: /^[\u3040-\u309F]+$/,
    katakanaRegEx: /^[\u30A0-\u30FF]+$/,
    kanjiRegEx: /^[\u4E00-\u9FAF]+$/,

    /**
     * @public
     */
    initialize: function () {
    },

    isEmpty: function () {
      if (_.trim(this.get('searchTerm')) === '') {
        return true;
      }
      return false;
    },

    setSearchTerm: function (term) {
      term = _.trim(term);
      this.set({readingType: this.parseReadingType(term)}, {silent: true});
      this.set('searchTerm', term);
    },

    /**
     * Determines which syllabary is used in the input.
     * @param {string} input
     * @return {string}
     */
    parseReadingType: function (input) {
      if(this.hiraganaRegEx.test(input)) {
        return 'kunyomi';
      }
      if(this.katakanaRegEx.test(input)) {
        return 'onyomi';
      }
      if(this.kanjiRegEx.test(input)) {
        return 'kanji';
      }
      return 'romaji';
    },

    parseReadingTypeLabel: function (reading) {
      if (!reading || !_.isString(reading)) {
        return this.defaults.readingType;
      }
      reading = _.trim(reading.toLowerCase());
      if (_.indexOf(this.validReadingTypes, reading) !== -1) {
        return reading;
      }
      return this.defaults.readingType;
    }

  });

  return Query;
});
