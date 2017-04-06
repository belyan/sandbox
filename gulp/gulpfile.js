'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Plugins
var concat = require('gulp-concat');
var del = require('del');
var ignore = require('gulp-ignore');
var imageDataURI = require('gulp-image-data-uri');
var less = require('gulp-less');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var soynode = require('gulp-soynode');

// The default task
gulp.task('default', ['watch']);

// Watch files for changes and reload
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: './',
            directory: true
        },
        startPath: 'markup/',
        port: 3000,
        browser: 'google chrome'
    });

    gulp.watch('markup/**/*.html', reload);
    gulp.watch('styles/**/*.less', ['styles', reload]);
    gulp.watch('images/icons/*', ['icons']);
    gulp.watch('mocks/*.js', ['mocks', reload]);
    gulp.watch('templates/**/*.soy', ['templates', reload]);
});

// Build automatically generated files
gulp.task('build', ['clean'], function () {
    runSequence('icons', ['styles', 'mocks', 'templates'], function () {
        console.log('BUILD DONE');
    });
});

// Clean automatically generated files
gulp.task('clean', function () {
    del(['styles/*.css', 'styles/common/icons.less', 'scripts/mocks.js', 'scripts/templates/']);
});

// Compile and automatically prefix stylesheets
gulp.task('styles', function () {
    return gulp.src('styles/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('styles/'));
});

// Converting icons to inline data-URIs
gulp.task('icons', function () {
    return gulp.src('images/icons/*')
        .pipe(imageDataURI({
            template: {
                file: 'styles/icons-template'
            }
        }))
        .pipe(concat('icons.less'))
        .pipe(gulp.dest('styles/common/'));
});

// Concat mocks in one file
gulp.task('mocks', function () {
    return gulp.src('mocks/*.js')
        .pipe(concat('mocks.js'))
        .pipe(gulp.dest('scripts/'));
});

// Task for working with Closure Templates, aka Soy
gulp.task('templates', function() {
    return gulp.src('templates/**/*.soy')
        .pipe(soynode())
        .pipe(ignore.exclude('*.soy'))
        .pipe(concat('bundle.soy.js'))
        .pipe(gulp.dest('scripts/templates/'));
});

// Message extraction
gulp.task('translations', function() {
    return gulp.src('templates/**/*.soy')
        .pipe(soynode.lang({
            outputFile: 'translations/translations_en.xlf'
        }));
});