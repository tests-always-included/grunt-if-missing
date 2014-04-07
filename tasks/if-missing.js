var fs;

fs = require('fs');

module.exports = function (grunt) {
    'use strict';

    grunt.registerTask("if-missing", "Conditionally run tasks if destination files are missing", function (taskName, targetName) {
        var config, files, isMissing, self, tasks;

        tasks = [];
        self = this;

        // Detect target - if none specified, run all targets
        if (!targetName) {
            Object.keys(grunt.config(taskName)).forEach(function (discoveredTargetName) {
                if (!/^_|^options$/.test(discoveredTargetName)) {
                    tasks.push(self.name + ':' + taskName + ':' + discoveredTargetName);
                }
            });
            return grunt.task.run(tasks);
        }

        config = grunt.config.get([taskName, targetName]);
        files = grunt.task.normalizeMultiTaskFiles(config, targetName);
        isMissing = false;
        files.forEach(function (f) {
            try {
                if (!isMissing) {
                    /*jslint stupid:true*/
                    fs.statSync(f.dest);
                    /*jslint stupid:false*/
                }
            } catch (ex) {
                isMissing = true;
            }
        });

        if (isMissing) {
            grunt.task.run([
                [].slice.call(arguments).join(':')
            ]);
        }
    });
};
