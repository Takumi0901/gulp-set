var gulp           = require('gulp'),
    sass           = require('gulp-sass'),
    cssmin         = require('gulp-cssmin'),
    rename         = require('gulp-rename'),
    csscomb        = require('gulp-csscomb'),
    header         = require('gulp-header'),
    autoprefixer   = require('gulp-autoprefixer'),
    plumber        = require('gulp-plumber'),
    uglify         = require('gulp-uglify');

var exports = {
  entry: 'src/',
  file: 'app.scss',
  output: 'dist/',
  browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.4'],
  outputStyle: 'expanded'
}

// sass　コンパイル
gulp.task('sass', function(){
  gulp.src(exports.entry + 'sass/' + exports.file)
    .pipe(plumber())
    .pipe(sass({
      outputStyle: exports.outputStyle
    }))
    .pipe(autoprefixer({
      browsers: exports.browsers,
      cascade: false
    }))
    .pipe(header('@charset "utf-8";\n\n'))
    .pipe(gulp.dest(exports.entry + 'css'));
});

gulp.task('build', function(){
  gulp.src(exports.entry + 'css/**')
    .pipe(plumber())
    .pipe(csscomb())
    .pipe(gulp.dest(exports.output + 'css'));
});


// cssの圧縮
gulp.task('build:min', function () {
  return gulp.src(exports.output + 'css/**.css')
    .pipe(plumber())
    .pipe(csscomb())
    .pipe(cssmin())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(exports.output + 'css'));
});


// jsファイルを圧縮して.minを付与
gulp.task("js:min", function () {
  return gulp.src(exports.entry + 'js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(exports.output + "js"));
});


/**
 * watch
 */
gulp.task('start', function () {
  gulp.watch(exports.entry + 'sass/**/**/*', function () {
    gulp.run('sass');
  });
  gulp.watch(exports.entry + 'css/**', function() {
    gulp.run('build');
  });
  gulp.watch(exports.entry + 'js/*.js', function () {
    gulp.run('js:min');
  });
});

gulp.task('start:min', function () {
  gulp.watch(exports.entry + 'sass/**/**/*', function () {
    gulp.run('sass');
  });
  gulp.watch(exports.entry + 'css/**', function() {
    gulp.run('build:min');
  });
  gulp.watch(exports.entry + 'js/*.js', function () {
    gulp.run('js:min');
  });
});