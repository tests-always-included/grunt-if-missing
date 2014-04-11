module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.initConfig({
        jasmine_node: {
            unit: {
                src: [
                    'tasks/',
                    'tests/'
                ]
            }
        },
        jslint: {
            all: {
                src: [
                    'tasks/**/*.js',
                    'tests/**/*.js',
                    'Gruntfile.js',
                    'package.json'
                ],
                directives: {
                    predef: [
                        'module',
                        'require'
                    ]
                }
            }
        },
        pkg: grunt.file.readJSON("package.json")
    });

    grunt.registerTask("default", [
        "jslint"
    ]);
    grunt.registerTask("test", [
        "default",
        "jasmine_node"
    ]);
};
