/*
 * grunt-cdn-refresh
 * https://github.com/juliomenendez/grunt-cdn-refresh
 *
 * Copyright (c) 2013 Julio C. Menendez
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var fs = require('fs'),
      akamai = require('akamai');

  var refreshers = {
    akamai: function(data, doneFn) {
      var purge = new akamai.purge(data.urls, {
        user: data.user,
        password: data.password,
        domain: data.domain || 'production',
        notify: data.notify
      }, function(error, response) {
        if (error) {
          grunt.log.error(error);
          doneFn(false);
        }

        doneFn('refresh request sent.');
      });
    }
  };

  grunt.registerMultiTask('cdn_refresh', 'Refresh content in a CDN.', function() {
    var data = this.data,
        done = this.async(),
        authFile = data['authFile'] || '.cdn_auth';

    if (fs.existsSync(authFile)) {
        var authData = JSON.parse(grunt.file.read(authFile))[this.target];
        data.user = data.user || authData.user;
        data.password = data.password || authData.password;
        data.notify = data.notify || authData.email;
    }

    refreshers[this.target](data, done);
  });

};
