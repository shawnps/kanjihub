/*global phantom:true, console:true, WebPage:true, Date:true, document:true*/

// TODO: I just copied this off the web. Needs work.

(function () {
  'use strict';

  var url,
      timeout,
      page = require('webpage').create(),
      defer;

  if (phantom.args.length < 1) {
    console.log('Usage: phantomjs run-mocha.coffee URL [timeout]');
    phantom.exit();
  }

  url = phantom.args[0];
  timeout = phantom.args[1] || 6000;

  defer = function (checker, scrapper) {
    var start, condition, func, interval, time, testStart;
    start = new Date().getTime();
    testStart = new Date().getTime();
    condition = false;

    func = function () {
      if (new Date().getTime() - start < timeout && !condition) {
        condition = checker();
      } else {
        if (!condition) {
          console.log('Timeout passed before the tests finished.');
          phantom.exit();
        } else {
          clearInterval(interval);
          time = Math.round((new Date().getTime() - testStart) / 100) / 10;
          console.log('Finished in ' + time + 's.');
          scrapper();
          phantom.exit();
        }
      }
    };

    // TODO: This just happens to work if it has a high enough wait time
    // Need a more reliable way to determine if tests are done running.
    interval = setInterval(func, 500);
  };

  page.onConsoleMessage = function (msg) {
    console.log(msg);
  };

  page.onError = function (msg, trace) {
    console.log(msg);
    trace.forEach(function(item) {
        console.log('  ', item.file, ':', item.line);
    });
  };

  page.onResourceReceived = function (response) {
    if (response.status !== 200) {
      console.log('====================');
      console.log('REQUEST ERROR: ' + response.url);
      console.log('====================');
      console.log(JSON.stringify(response, undefined, 2));
      console.log('====================\n');
    }
  };

  page.open(url, function (status) {
    var completeChecker, scrapper;

    if (status !== 'success') {
      console.log('Failed to load the page. Check the url');
      phantom.exit();
    }

    completeChecker = function () {
      return page.evaluate(function () {
        return document.querySelector('.duration');
      });
    };

    scrapper = function () {
      var all, failureList, i, len;

      all = page.evaluate(function () {
        var specs, i, len, results = [];
        specs = document.querySelectorAll('.test');
        console.log('ran ' + specs.length + ' specs');
        for (i = 0, len = specs.length; i < len; i += 1) {
          results.push(specs[i].getAttribute('class').search(/fail/) === -1);
        }
        return results;
      });

      // Outputs a '.' or 'F' for each test
      console.log(
        all.reduce(function (str, specPassed) {
          str += (specPassed) ? '.' : 'F';
          return str;
        }, '')
      );

      failureList = page.evaluate(function () {
        var parseSuite, parseSuites, parseTests, extractNodes;

        extractNodes = function (nodes, match) {
          var i, len, regex, results = [];
          regex = new RegExp(match);
          for (i = 0, len = nodes.length; i < len; i += 1) {
            if (nodes[i].getAttribute('class').search(regex) !== -1) {
              results.push(nodes[i]);
            }
          }
          return results;
        };

        parseTests = function(tests) {
          var i, len, messages = [];
          for (i = 0, len = tests.length; i < len; i += 1) {
            messages.push(
              tests[i].querySelector('h2').innerText + ' - ' +
              tests[i].querySelector('.error').innerText
            );
          }
          messages = messages.join('  \n');
          return messages;
        };

        parseSuite = function (suite, description) {
          var nested, tests, div, fails = [];
          div = suite.querySelector('div');
          if (typeof description === 'undefined') {
            description = [];
          }
          description.push(suite.querySelector('h1').innerText);
          tests = extractNodes(div.childNodes, 'fail');
          if (tests.length) {
            fails.push({
              desc: description.join(' :: '),
              msg: '  ' + parseTests(tests)
            });
          }
          nested = extractNodes(div.childNodes, 'suite');
          if (nested.length) {
            fails = fails.concat(parseSuites(nested, description));
          }
          return fails;
        };

        parseSuites = function (suites, description) {
          var i, len, fails = [];
          for (i = 0, len = suites.length; i < len; i += 1) {
            fails = fails.concat(parseSuite(suites[i], description));
          }
          return fails;
        };

        return parseSuites(document.querySelectorAll('#mocha > .suite'), []);
      });

      // If the list of failures is not empty output the failure messages
      console.log('');
      if (failureList.length) {
        for (i = 0, len = failureList.length; i < len; i += 1) {
          console.log(failureList[i].desc + '\n' + failureList[i].msg + '\n');
        }
      }

    };

    defer(completeChecker, scrapper);
  });

}());
