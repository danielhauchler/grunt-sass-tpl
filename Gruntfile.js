module.exports = function(grunt) {
    // Configuration 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bowercopy: {
            folders: {
                files: {
                    'assets/scss/libs/animejs/anime.scss': 'animejs/documentation/assets/css/anime.css',
                    'assets/js/libs/anime.js': 'animejs/documentation/assets/js/anime.js',
                },
            }
        },
        concat: {
            dist: {
                src: [
                    'assets/js/script.js',
                    'assets/js/libs/animejs/anime.js',
                ],
                dest: 'dist/js/bundle.js'
            }
        },
        uglify: {
            build: {
                src: 'dist/js/bundle.js',
                dest: 'dist/js/bundle.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/css/style.css': 'assets/scss/index.scss',
                }
            }
        },
        autoprefixer: {
            single_file: {
                src: 'dist/css/style.css',
                dest: 'dist/css/style.min.css'
            }
        },
        copy: {
          main: {
            files: [
              // includes files within path
              {expand: true, flatten: true, cwd: './', src: ['assets/index.html'], dest: 'dist/', filter: 'isFile'},
            ]
          },
        },
        watch: {
            scripts: {
                files: ['assets/js/*.js'],
                tasks: ['default'],
                options: {
                    livereload: true,
                    spawn: false
                }
            },
            css: {
                files: ['assets/scss/**/*.scss'],
                tasks: ['default'],
                options: {
                    livereload: true,
                    spawn: false
                }
            }
        }
    });
    // Plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // all
    grunt.registerTask('default', ['bowercopy', 'sass', 'copy', 'autoprefixer', 'concat', 'uglify', 'watch']);
    // production
    grunt.registerTask('production', ['sass', 'autoprefixer', 'concat', 'uglify', 'watch']);
};