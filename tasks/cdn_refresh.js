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
        akamai = require('akamai'),
        path = require('path'),

        resolveHome = function (string) {
            if (string.substr(0,1) === '~') {
                var envVar = (process.platform.substr(0, 3) === 'win') ? 'USERPROFILE' : 'HOME';
                string = path.join(process.env[envVar], string.substr(1));
            }
            return path.resolve(string);
        },

        loadJSON = function (path) {
            return JSON.parse(fs.readFileSync(path));
        },

        refreshers = {
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
            authFromFile = {},
            authFile,
            done = this.async(),
            provider = data.provider || this.target;

        authFile = path.join(process.cwd(), data.authFile || '.cdn_auth');

        if (fs.existsSync(authFile)) {
            authFromFile = loadJSON(authFile)[provider] || {};
        } else {
            authFile = resolveHome(process.env.AKAMAI_REST_AUTH || '~/.cdn_auth');
            if (fs.existsSync(authFile)) {
                authFromFile = loadJSON(authFile)[provider] || {};
            }
        }

        data.user = data.user || authFromFile.user;
        data.password = data.password || authFromFile.password;
        data.notify = data.notify || authFromFile.email;

        refreshers[provider](data, done);
    });
};
