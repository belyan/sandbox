'use strict';

var config = require('./config.json');

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var del = require('del');
var runSequence = require('run-sequence');

// Load plugins
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

// The default task
gulp.task('default', ['watch']);

// Watch files for changes and reload
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: config.server.baseDir,
            directory: true
        },
        startPath: config.server.startPath,
        port: 3000,
        browser: 'google chrome'
    });

    gulp.watch(config.watch.markup, reload).on('change', onChange);
    gulp.watch(config.watch.icons, ['icons']).on('change', onChange);
    gulp.watch(config.watch.styles, ['styles', reload]).on('change', onChange);
    gulp.watch(config.watch.mocks, ['mocks', reload]).on('change', onChange);
    gulp.watch(config.watch.templates, ['templates', reload]).on('change', onChange);
});

// Build automatically generated files
gulp.task('build', ['clean'], function () {
    runSequence('icons', ['styles', 'mocks', 'templates'], function () {
        console.log('BUILD DONE');
    });
});

// Clean automatically generated files
gulp.task('clean', function () {
    del([
        config.styles.dest + '*.css',
        config.icons.dest + config.icons.fileName,
        config.mocks.dest + config.mocks.fileName,
        config.templates.dest
    ]);
});

// Converting icons to inline data-URIs
gulp.task('icons', function () {
    return gulp.src(config.icons.src)
        .pipe(plugins.imageDataUri({
            template: {
                file: config.icons.template
            }
        }))
        .pipe(plugins.concat(config.icons.fileName))
        .pipe(plugins.size({title: 'icons'}))
        .pipe(gulp.dest(config.icons.dest));
});

// Compile and automatically prefix stylesheets
gulp.task('styles', function () {
    return gulp.src(config.styles.src)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.less().on('error', onError))
        .pipe(plugins.size({title: 'styles'}))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(config.styles.dest));
});

// Concat mocks in one file
gulp.task('mocks', function () {
    return gulp.src(config.mocks.src)
        .pipe(plugins.concat(config.mocks.fileName))
        .pipe(plugins.size({title: 'mocks'}))
        .pipe(gulp.dest(config.mocks.dest));
});

// Task for working with Closure Templates, aka Soy
gulp.task('templates', function (event) {
    return gulp.src(config.templates.src)
        .pipe(plugins.newer({
            dest: config.templates.dest,
            ext: 'soy.js'
        }))
        .pipe(plugins.soynode().on('error', onError))
        .pipe(plugins.ignore.exclude('*.soy'))
        .pipe(gulp.dest(config.templates.dest))
        .pipe(plugins.concat(config.templates.fileName))
        .pipe(plugins.size({title: 'templates'}))
        .pipe(gulp.dest(config.templates.dest));
});

// Message extraction
gulp.task('translations', function () {
    return gulp.src(config.templates.src)
        .pipe(plugins.soynode.lang({
            outputFile: config.templates.options.messageFilePathFormat
                .replace('{LOCALE}', config.templates.options.locales[0])
        }));
});

// Change event
function onChange(event) {
    console.log(event.path);
}

// Error handler
function onError(err) {
    console.log(err);
    this.emit('end');
}