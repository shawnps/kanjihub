module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('mochaphantom', 'Run Mocha tests with PhantomJS',
  function () {

    // This is async. Don't retunr until done() is called.
    var done = this.async(),
        // All config options for this task.
        config = grunt.config.get('mochaphantom');

    // These options are required.
    function validate() {
      grunt.config.requires('mochaphantom.src');
      grunt.config.requires('mochaphantom.testRunnerUrl');
    }

    // Load all the test files and map them to their AMD deps format.
    function loadTestFiles() {
      // Array of all the files to test.
      var testFiles;
      testFiles = grunt.file.expandFiles(config.src);
      console.log('Running tests:');
      console.dir(testFiles);
      testFiles = testFiles.map(function (file) {
        return '\'../../' + file.replace('.js', '') + '\'';
      });
      return testFiles;
    }

    // Write out an AMD file which returns a list of all test files.
    function writeTestList() {
      grunt.file.write('testrunner/testlist.js',
        'define(function () {\n' +
        '  return [' + loadTestFiles() + '];\n' +
        '});'
      );
    }

    function onPhantomComplete(err, result) {
      if (err) {
        console.error(err);
      }
      console.log();
      console.log(result.stdout);
      done();
    }

    function launchPhantom() {
      grunt.helper('phantomjs', {
        args: [
          // File that orchestrates PhantomJS and scrapes the results.
          grunt.task.getFile('mochaphantom/mocha-scraper.js'),
          config.testRunnerUrl
        ],
        done: onPhantomComplete
      });
    }

    validate();
    writeTestList();
    launchPhantom();
  });

};
