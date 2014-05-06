grunt-if-missing
================

Conditionally run a task if any of its destination files do not exist.

[![NPM][npm-image]][NPM]
[![Build Status][travis-image]][Travis CI]
[![Dependencies][dependencies-image]][Dependencies]
[![Dev Dependencies][devdependencies-image]][Dev Dependencies]


Why?
----

I used [grunt-curl] to download an external dependency.  That task would get executed often, but the file did not need to get downloaded again if it already existed.  With this plugin I am able to execute a task if it is currently missing its "dest" file.

Another project uses a git submodule as a dependency and needs to build it once before using it.  This plugin is able to determine if a file exists and will use [grunt-run] to start a build that will generate the necessary files.  Once they exist they won't need to get rebuilt.


Usage
-----

This plugin requires [Grunt] ~0.4.1.  If you have not used [Grunt] before, make sure to read its [Getting Started](http://gruntjs.com/getting-started) guide to learn about `gruntfile.js` and installing plugins.

Installation is easy and identical to other plugins:

    npm install grunt-if-missing --save-dev

Once installed, you might have it loaded automatically if you use [load-grunt-tasks], or you can manually load it with this line:

    grunt.loadNpmTasks('grunt-if-missing');


Configuration
-------------

There is no special configuration necessary.  Like the [newer] plugin, you will just add `if-missing` as the first argument when running other tasks.  Let's use a configuration that uses [grunt-curl] as an example.

    grunt.initConfig({
        curl: {
            angular: {
                dest: "3rd_party/angular-1.2.14.zip",
                src: "http://code.angularjs.org/1.2.14/angular-1.2.14.zip"
            }
        }
    });
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-if-missing');
    grunt.registerTask('get-dependencies', [
        'if-missing:curl:angular'
    ]);

By using just this configuration, you can now download your Angular dependency by issuing `grunt curl`.  It would normally download it every time, even if it already existed.  `grunt get-dependencies` will download the file only if it does not already exist at `3rd_party/angular-1.2.14.zip`.

This task is only able to be used with other tasks that have `dest` defined or specify a destination filename in any of the standard methods.


Development
-----------

If you want to work on this library, you need to check out the repository and run `npm install` to get the dependencies.

Tests are *always* included.  Make sure tests cover your changes.  To run the current tests, just use `npm test` or `grunt test` (they will run the same test suite).


License
-------

This software is licensed under an [MIT license with an additional non-advertising clause](LICENSE.md).


[Dependencies]: https://david-dm.org/tests-always-included/grunt-if-missing
[dependencies-image]: https://david-dm.org/tests-always-included/grunt-if-missing.png
[Dev Dependencies]: https://david-dm.org/tests-always-included/grunt-if-missing#info=devDependencies
[devdependencies-image]: https://david-dm.org/tests-always-included/grunt-if-missing/dev-status.png
[grunt-curl]: https://github.com/twolfson/grunt-curl
[grunt]: http://gruntjs.com/
[grunt-run]: https://github.com/spenceralger/grunt-run
[load-grunt-tasks]: https://github.com/sindresorhus/load-grunt-tasks
[newer]: https://github.com/tschaub/grunt-newer
[NPM]: https://npmjs.org/package/grunt-if-missing
[npm-image]: https://nodei.co/npm/grunt-if-missing.png?downloads=true&stars=true
[Travis CI]: http://travis-ci.org/tests-always-included/grunt-if-missing?branch=master
[travis-image]: https://secure.travis-ci.org/tests-always-included/grunt-if-missing.png
