// Include gulp
var gulp = require('gulp');
// Include plugins
//var typescript = require('gulp-typescript');
//var sourcemaps = require('gulp-sourcemaps');
//var babel = require('gulp-babel');
//var rename = require('gulp-rename');
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

//https://gist.github.com/demisx/beef93591edc1521330a
var config = {
  dirs: {
    build: 'public',
    source: 'resources',
    tmp: 'var/tmp',
    javascript: 'js',
    typescript: 'ts',
    sass: 'scss',
    css: 'css',
  },
  extensions: {
    javascript: '.js',
    typescript: '.ts',
    scss: '.scss',
    css: '.css',
  }
};

// Handle Javascript
// Move source to public
gulp.task('scripts', function () {

    let { source, javascript, build } = config.dirs;
    let { javascript: jsext } = config.extensions;

    console.log(`${source}/${javascript}/*${jsext}`);

    return gulp.src(`${source}/${javascript}/*${jsext}`)
      .pipe(gulp.dest(`${build}/${javascript}/`));
});

// Compile and Concatenate CSS
sass.compiler = require('node-sass');

gulp.task('sass', function () {

  let { source, sass: sassdir, build, css } = config.dirs;
  let { scss } = config.extensions;

  return gulp.src(`${source}/${sassdir}/*${scss}`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${build}/${css}/`));
});

//Watches
gulp.task('watch:styles', function () {
  let { source, sass: sassdir } = config.dirs;
  let { scss } = config.extensions;
  gulp.watch(`${source}/${sassdir}/*${scss}`, gulp.series('sass'));
});

gulp.task('watch', gulp.parallel('watch:styles'));

// Default Task (https://fettblog.eu/gulp-4-parallel-and-series/)
gulp.task('default', gulp.series('scripts', 'sass', 'watch'));

gulp.task('vagrant', gulp.series('scripts', 'sass'));
