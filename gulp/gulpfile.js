'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Plugins
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');

var reload = browserSync.reload;

gulp.task('default', ['watch']);

// Watch files for changes and reload
gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: './',
            directory: true
        },
        startPath: 'markup/',
        port: 3000
    });

    gulp.watch('markup/**/*.html', reload);
    gulp.watch('styles/**/*.less', ['styles', reload]);
});

// Compile and automatically prefix stylesheets
gulp.task('styles', function () {
    return gulp.src('styles/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('styles/'));
});
