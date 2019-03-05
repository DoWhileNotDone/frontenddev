var gulp = require("gulp");
var ts = require("gulp-typescript");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');
var tsProject = ts.createProject("tsconfig.json");

gulp.task('typescript', function () {
  return tsProject.src()
      .pipe(tsProject())
      .js.pipe(gulp.dest("public/js"));
});

gulp.task('watch:scripts', function () {
   gulp.watch('./resources/ts/*.ts', gulp.series('typescript'));
});

gulp.task('sass', function () {
  return gulp.src('./resources/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch:styles', function () {
   gulp.watch('./resources/scss/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.parallel('typescript', 'sass'));
gulp.task('watch', gulp.parallel('watch:scripts', 'watch:styles'));
