var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var watchify = require("watchify");
var log = require('fancy-log');

var sass = require('gulp-sass');
sass.compiler = require('node-sass');

//Bundle script files, write sourcemaps, uglify and deposit in public/js
function bundle(o) {
    return o
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("public/js"));
}

//Compile transcript files with browserify for modules
var b = browserify({
  basedir: '.',
  debug: true,
  entries: ['resources/ts/main.ts'],
  cache: {},
  packageCache: {}
})
.plugin(tsify);

function defaultbundle() {
  return bundle(b);
}

// Compile and Concatenate CSS
gulp.task('sass', function () {
  return gulp.src('./resources/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

//Watches
//Watchify for Browserify
function watchbundle () {
  var w = watchify(b);
  w.on("update", watchbundle);
  w.on("log", log);
  return bundle(w);
}
//Gulp Watch for Sass
gulp.task('watch:styles', function () {
   gulp.watch('./resources/scss/*.scss', gulp.series('sass'));
});

// Default Task (https://fettblog.eu/gulp-4-parallel-and-series/)
gulp.task('default', gulp.parallel(defaultbundle, 'sass'));
gulp.task('watch', gulp.series(watchbundle, 'watch:styles'));
