var gulp  = require('gulp');
var gutil = require('gulp-util');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var ngAnnotate = require('gulp-ng-annotate');
var bytediff = require('gulp-bytediff');

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var paths = {
  source: 'src/ng-giphy.js',
  dest  : 'dist'
};

gulp.task('jshint', function() {
  return gulp.src(paths.source)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('build-js', ['jshint'], function() {
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

gulp.task('watch', function(){
    gulp.watch('src/**/*.js', ['build-js']);
});

gulp.task('default', ['build-js']);
