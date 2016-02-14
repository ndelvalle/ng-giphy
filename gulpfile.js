var gulp  = require('gulp');
var gutil = require('gulp-util');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('build-js', function() {
  return gulp.src('src/ng-giphy.js')
    .pipe(sourcemaps.init())
    .pipe(concat('ng-giphy.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch-js', function(){
    gulp.watch('src/**/*.js', ['build-js']);  
});

gulp.task('default', ['build-js', 'watch-js']);
