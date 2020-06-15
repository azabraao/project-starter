const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const image = require('gulp-image');
sass.compiler = require('node-sass');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglifycss = require('gulp-uglifycss');

gulp.task('image', async () => {
  gulp
    .src('./src/assets/img/fixture/*')
    .pipe(image())
    .pipe(clean())
    .pipe(gulp.dest('./src/assets/img/'));
});

gulp.task('sass', async () => {
  gulp
    .src('./assets/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css/'))

    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('sass:build', async () => {
  gulp
    .src('./assets/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/assets/scss/'))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./src/assets/css/'))

    .pipe(
      uglifycss({
        uglyComments: true,
      })
    )
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('./src/assets/css/'));
});

gulp.task('sass:watch', () => {
  gulp.watch('./assets/scss/**/*.scss', gulp.series(['sass-css']));
});

gulp.task('watch', () => {
  gulp.watch('./assets/scss/**/*.scss', gulp.series(['sass']));
  gulp.watch('./assets/img/fixture/*', gulp.series(['image']));
});

gulp.task('default', gulp.series(['watch']));
