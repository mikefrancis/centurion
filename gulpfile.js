const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync').create();

const config = {
  src: {
    root: './src',
    js: 'js',
  },
  dist: {
    root: './dist',
    js: 'js',
  },
};

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: config.dist.root,
    },
  });
});

gulp.task('js', () => {
  return browserify(config.src.root + '/' + config.src.js + '/index.js')
    .transform(babelify, { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest(config.dist.root + '/' + config.dist.js))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', () => {
  gulp.watch(config.src.root + '/' + config.src.js + '/**/*.js', ['js']);
});

gulp.task('default', ['browser-sync', 'js', 'watch']);
