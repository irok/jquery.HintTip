var pkg  = require('./package.json');
var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var del  = require('del');
var run  = require('run-sequence');

$.banner = function() {
    return $.header([
        '/**',
        ' * <%= pkg.title %> v<%= pkg.version %>',
        ' *',
        ' * Copyright 2015 <%= pkg.author.name %>',
        ' * Released under the MIT license',
        ' *',
        ' * Date: <%= $.util.date("isoUtcDateTime") %>',
        ' */',
        ''].join('\n'),
        { 'pkg': pkg, '$': $ }
    );
};

$.minBanner = function() {
    return $.header([
        '/*!',
        ' * <%= pkg.title %> v<%= pkg.version %>',
        ' * (c) 2015 <%= pkg.author.name %>',
        ' * MIT license',
        ' */',
        ''].join('\n'),
        { 'pkg': pkg, '$': $ }
    );
};

gulp.task('default', function(cb) {
    run('clean', ['build:js', 'build:css'], cb);
});

gulp.task('clean', function(cb) {
    del('dist', cb);
});

gulp.task('build:js', function() {
    return gulp.src('src/*.js')
        .pipe($.banner())
        .pipe(gulp.dest('dist/'))
        .pipe($.sourcemaps.init())
        .pipe($.rename({suffix: '.min'}))
        .pipe($.minBanner())
        .pipe($.uglify({preserveComments: 'some'}))
        .pipe($.sourcemaps.write('./', {includeContent: false}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build:css', function() {
    return gulp.src('src/*.css')
        .pipe($.banner())
        .pipe(gulp.dest('dist/'))
        .pipe($.minifyCss())
        .pipe($.minBanner())
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/'));
});
