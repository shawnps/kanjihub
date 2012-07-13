module.exports = function (grunt) {
  'use strict';

  var handlebars = require('handlebars');

  grunt.registerTask( 'handlebars', 'Compile templates', function () {
    var config, files;

    grunt.config.requires('handlebars.src');
    grunt.config.requires('handlebars.srcRoot');
    grunt.config.requires('handlebars.dest');

    config = grunt.config.get('handlebars');
    files = grunt.file.expandFiles(config.src);
    grunt.file.mkdir(config.dest);

    files.forEach(function (file) {
      var dest = config.dest;
      dest += file
        .replace(config.srcRoot, '')
        .replace('.handlebars', '.js');
      grunt.file.write(dest,
        handlebars.precompile(grunt.file.read(file), { s: true }));
    });
  });

};
