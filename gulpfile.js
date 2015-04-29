var gulp         = require('gulp');
var connect      = require('gulp-connect');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserify   = require('browserify');
var babelify     = require('babelify');
var uglify       = require('gulp-uglify');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');

var env          = process.env.NODE_ENV || 'development';

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('css', function() {
  var sassConfig = {};

  if (env === 'development') {
    sassConfig.sourceComments = 'map';
  } else {
    sassConfig.outputStyle = 'compressed';
  }

  gulp.src('scss/style.scss')
    .pipe(sass(sassConfig))
    .pipe(autoprefixer())
    .pipe(gulp.dest('css'))
    .pipe(connect.reload());
});

gulp.task('js', function() {
  return browserify({
      entries: './js/app.js',
      debug: env === 'development'
    })
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['css']);
  gulp.watch('js/app.js', ['js']);
});

gulp.task('default', ['css', 'js', 'connect', 'watch']);