var gulp        = require('gulp');
var gutil       = require('gulp-util');

var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');

var ngAnnotate  = require('gulp-ng-annotate');
var bytediff    = require('gulp-bytediff');

var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');

var paths       = require('./helpers/paths');
var tasks       = require('./helpers/tasks');

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
