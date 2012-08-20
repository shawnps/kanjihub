/**
 * @fileOverview
 * A simple wrapper for Handlebars that adds custom helpers to it.
 */

define([
  'handlebarsBase'
],
function (Handlebars) {
  'use strict';

  Handlebars.registerHelper('ifequal', function (val1, val2, options) {
    var fn = options.fn;
    if (val1 === val2) {
      return fn();
    }
  });

  /**
   * {{#each_with_prev_value array property}}
   *   <li>{{myProp}}}</li>
   * {{/each_with_prev_value}}
   */
  Handlebars.registerHelper('each_with_prev_value',
  function(array, propName, options) {
    var buffer = '', i, len, item;
    for (i = 0, len = array.length; i < len; i += 1) {
      item = array[i];
      item.prevDifferent = true;
      if (i > 0) {
        item.prev = array[i-1][propName];
        if (item.prev === item[propName]) {
          item.prevDifferent = false;
        }
      }
      // show the inside of the block
      buffer += options.fn(item);
    }

    // return the finished buffer
    return buffer;
  });

  return Handlebars;
});
