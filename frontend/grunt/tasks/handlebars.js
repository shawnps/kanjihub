module.exports = function (grunt) {
  'use strict';

  var handlebars = require('handlebars'),
      basename = require('path').basename,
      util = require('util'),
      exec = require('child_process').exec;

  grunt.registerTask('handlebars', 'Compile templates', function () {
    var config,
        files,
        fileCount = 0,
        done = this.async();

    // Required configuration options.
    grunt.config.requires('handlebars.src');
    grunt.config.requires('handlebars.srcRoot');
    grunt.config.requires('handlebars.dest');

    // Wraps the compiled template code in AMD goodness and writes out the file.
    function writeFile(content, dest, template) {
      var output = [];
      output.push('define([\'handlebars\'], function(Handlebars) {');
      output.push('\n');
      output.push(content);
      output.push('\n');
      output.push('return Handlebars.templates[\'' + template + '\'];');
      output.push('});');
      grunt.file.write(dest, output.join(''));
    }

    // Handler for when handlebars compilation completes.
    function onCompile(err, stdout, stderr, dest, template) {
      fileCount += 1;
      if (err) {
        util.puts(err);
        // Fail the task.
        done(false);
        return;
      }
      writeFile(stdout, dest, template);
      if (fileCount === files.length) {
        done();
      }
    }

    config = grunt.config.get('handlebars');
    files = grunt.file.expandFiles(config.src);
    grunt.file.mkdir(config.dest);

    if (!files || files.length === 0) {
      util.puts('no templates to compile. goodbye.');
      done();
    }

    files.forEach(function (file) {
          // The output file path.
      var dest = config.dest,
          // Regex for extension replacement.
          extensionRe = /\.handlebars$/,
          // The template name.
          template = basename(file);

      template = template.replace(extensionRe, '');

      util.puts('compiling ' + template + '...');

      // The destination output file name.
      dest += file
        .replace(config.srcRoot, '')
        .replace(extensionRe, '.js');

      exec('handlebars ' + file, function (err, stdout, stderr) {
        onCompile(err, stdout, stderr, dest, template);
      });

    });

  });

};
