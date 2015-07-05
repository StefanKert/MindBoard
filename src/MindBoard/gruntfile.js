module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            options: {
                'no-write': true
            },
            wwwroot: ["wwwroot/lib/**", "temp/", "wwwroot/app"]
        },
        bower: {
            install: {
                options: {
                    targetDir: "vendor",
                    layout: "byComponent",
                    cleanTargetDir: false
                }
            }
        },
        copy: {
            all: {
                files: [{
                    expand: true,
                    src: ['app/**/*.html'],
                    dest: 'wwwroot/'
                }]
            }
        },
        concat: {
            all: {
                src: [
                    'vendor/angular/*.js',
                    'vendor/ui-router/*.js',
                    'vendor/firebase/*.js',
                    'vendor/angularfire/*.js',
                    'vendor/angular-local-storage/*.js',
                    //'vendor/**/*.js',
                    '!vendor/modernizr/*.js',
                    '!vendor/modernizr/**/*.*',
                    '!vendor/angular-firebase/demo/*.*',
                    'app/app.module.js',
                    'app/**/*.js',
                    '!vendor/**/*.min.js'
                ],
                dest: 'wwwroot/js/combined.js'
            }
        },
        jshint: {
            files: ['app/**/*.js'],
            options: {
                '-W069': false,
            }
        },
        uglify: {
            all: {
                src: ['wwwroot/js/combined.js'],
                dest: 'wwwroot/js/combined.min.js'
            }
        },
        watch: {
            js: {
                files: ['**/*.js'],
                tasks: ['concat', 'copy'],
                options: {
                    livereload: true,
                }
            },
            html: {
                files: ['app/**/*.html'],
                tasks: ['copy'],
                options: {
                    livereload: true,
                }
            }
        },
        ngAnnotate: {
            compile: {
                files: [
                    {
                        src: 'wwwroot/js/combined.js',
                        dest: 'wwwroot/js/combined.js'
                    }
                ]
            }
        },
        htmlmin: {   
            dist: { 
                options: {   
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {       
                    'wwwroot/index.html': 'index.html'
                }
            }
        }
    });

    grunt.registerTask('watch', ['watch:js', 'watch:html']);
    grunt.registerTask("default", ["bower:install"]);
    grunt.registerTask("all", ['clean', 'bower', 'concat', 'copy', 'jshint']);

    grunt.registerTask("updateJs", ['clean', 'bower', 'jshint', 'concat', 'ngAnnotate', 'uglify']);
    grunt.registerTask("updateHtms", ['htmlmin']);


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
};