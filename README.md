# grunt-cdn-refresh

> Refresh content on a CDN.

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-cdn-refresh --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-cdn-refresh');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html

## The "cdn_refresh" task

### Overview
In your project's Gruntfile, add a section named `cdn_refresh` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cdn_refresh: {
    akamai: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```
### Usage Examples

```js
grunt.initConfig({
  cdn_refresh: {
    akamai: {
        authFile: '.cdn_auth',
        urls: ['http://testing.com/file.js', 'http://testing.com/file.png']
    }
  },
})
```

Example ```.cdn_auth``` file

```js
{
  "akamai": {
    "user": "akamai_username@gmail.com",
    "password": "xxxxxxxxxx",
    "email": "notify_me@gmail.com"
  }
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][].

## Release History
_(Nothing yet)_
