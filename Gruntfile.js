/*
 * grunt-cdn-refresh
 * https://github.com/juliomenendez/grunt-cdn-refresh
 *
 * Copyright (c) 2013 Julio C. Menendez
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    cdn_refresh: {
        akamai: {
            authFile: '.cdn_auth',
            urls: ['http://testing.com/file.js', 'http://testing.com/file.png']
        }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint']);

};
