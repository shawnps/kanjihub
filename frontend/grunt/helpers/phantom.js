module.exports = function (grunt) {
  'use strict';

  grunt.registerHelper('phantomjs', function (options) {

    return grunt.utils.spawn({
      cmd: 'phantomjs',
      args: options.args
    },
    function(err, result, code) {
      if (!err) {
        return options.done(null, result);
      }

      // Something went horribly wrong.
      grunt.verbose.or.writeln();
      grunt.log.write('Running PhantomJS...').error();
      if (code === 127) {
        grunt.log.errorlns(
          'PhantomJS not installed! ' +
          'See the grunt FAQ for PhantomJS installation instructions: ' +
          'https://github.com/cowboy/grunt/blob/master/docs/faq.md'
        );
        grunt.warn('PhantomJS not found.', options.code);
      } else {
        result.split('\n').forEach(grunt.log.error, grunt.log);
        grunt.warn('PhantomJS exited unexpectedly with exit code ' +
          code + '.', options.code);
      }
      options.done(code);
    });

  });

};
