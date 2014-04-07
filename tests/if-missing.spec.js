/*global beforeEach, describe, expect, it, jasmine, spyOn*/

var fs = require('fs');

describe('if-missing', function () {
    'use strict';

    var grunt, module, registerArguments;

    beforeEach(function () {
        // Make a spy version of grunt
        grunt = jasmine.createSpyObj('grunt', [
            'config',
            'registerTask'
        ]);
        grunt.config.get = jasmine.createSpy('grunt.config.get');
        grunt.registerTask.andCallFake(function () {
            registerArguments = [].slice.call(arguments);
        });
        grunt.task = {
            normalizeMultiTaskFiles: jasmine.createSpy('grunt.task.normalizeMultiTaskFiles'),
            run: jasmine.createSpy('grunt.task.run')
        };

        // Load the module
        module = require('../tasks/if-missing');
        module(grunt);
    });

    it('called grunt.registerTask', function () {
        expect(!!registerArguments).toBe(true);
        expect(registerArguments[0]).toBe('if-missing');  // Task name
    });

    describe('when running the task', function () {
        var task;

        beforeEach(function () {
            task = function () {
                registerArguments[2].apply({
                    name: 'if-missing'
                }, [].slice.call(arguments));
            };
        });

        it('runs all targets if none are specified, skipping options', function () {
            grunt.config.andReturn({
                options: {},
                yellow1: true,
                yellow2: true,
                "_hidden": true
            });
            task('taskname');
            expect(grunt.task.run).toHaveBeenCalledWith([
                'if-missing:taskname:yellow1',
                'if-missing:taskname:yellow2'
            ]);
        });
        describe('when a target is specified', function () {
            beforeEach(function () {
                grunt.config.get.andReturn({});
            });
            it('never calls a task without a dest', function () {
                grunt.task.normalizeMultiTaskFiles.andReturn([]);
                task('green', 'emerald');
                expect(grunt.task.run).not.toHaveBeenCalled();
            });
            it('runs when one is missing files exist', function () {
                grunt.task.normalizeMultiTaskFiles.andReturn([
                    {
                        dest: 'aqua'
                    },
                    {
                        dest: 'teal'
                    },
                    {
                        dest: 'periwinkle'
                    }
                ]);
                spyOn(fs, 'statSync').andCallFake(function (filename) {
                    if (filename === 'teal') {
                        throw new Error('teal does not exist');
                    }
                });
                task('blue', 'cyan');
                /*jslint stupid:true*/
                expect(fs.statSync).toHaveBeenCalledWith('aqua');
                expect(fs.statSync).toHaveBeenCalledWith('teal');
                expect(fs.statSync).not.toHaveBeenCalledWith('periwinkle');
                /*jslint stupid:false*/
                expect(grunt.task.run).toHaveBeenCalledWith([
                    'blue:cyan'
                ]);
            });
            it('passes on arguments', function () {
                grunt.task.normalizeMultiTaskFiles.andReturn([
                    {
                        dest: 'schwartz'
                    }
                ]);
                task('black', 'charcoal', 'midnight', 'onyx');
                expect(grunt.task.run).toHaveBeenCalledWith([
                    'black:charcoal:midnight:onyx'
                ]);
            });
        });
    });
});
