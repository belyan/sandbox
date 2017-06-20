module.exports = function(grunt) {
    grunt.initConfig({
        coffee: {
            options: {
                bare: true
            },
            scripts: {
                expand: true,
                flatten: true,
                cwd: 'coffee/',
                src: ['*.coffee'],
                dest: 'js/',
                ext: '.js'
            }
        },

        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['coffee/*.coffee'],
                tasks: ['process']
            }
        },

        concat: {
            dist: {
                src: ['js/*.js'],
                dest: 'dist/js/all.js'
            }
        },

        uglify: {
            dist: {
                options: {
                    banner: '/* Created by Sorax | 2014 */'
                },
                files: {
                    'dist/js/all.min.js': ['dist/js/all.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask('process', ['newer:coffee', 'concat', 'uglify']);
    grunt.registerTask('default', ['coffee', 'concat', 'uglify', 'watch']);
};