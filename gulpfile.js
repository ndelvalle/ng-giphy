var gulp        = require('gulp'),
    gutil       = require('gulp-util'),

    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    sourcemaps  = require('gulp-sourcemaps'),

    ngAnnotate  = require('gulp-ng-annotate'),
    bytediff    = require('gulp-bytediff'),

    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'),

    paths       = require('./helpers/paths'),
    tasks       = require('./helpers/tasks');

gulp.task(tasks.js.hint, function() {
  return gulp.src(paths.source)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task(tasks.js.build, [tasks.js.hint], function() {
  return gulp.src(paths.source)
    .pipe(sourcemaps.init())
    .pipe(concat('ng-giphy.min.js', { newLine: ';' }))
    // Annotate before uglify so the code get's min'd properly.
    .pipe(ngAnnotate({
        // true helps add where @ngInject is not used. It infers.
        // Doesn't work with resolve, so we must be explicit there
        add: true
    }))
    .pipe(bytediff.start())
    .pipe(uglify({ mangle: true }))
    .pipe(bytediff.stop())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest));
});

gulp.task(tasks.watch, function(){
    gulp.watch(paths.source, [tasks.js.build]);
});

gulp.task('default', [tasks.js.build, tasks.watch]);
