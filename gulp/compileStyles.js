import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'gulp-csso';
import rename from 'gulp-rename';

var paths = {
    styles: {
      src: 'src/styles/**/*.scss',
      dest: 'build/css/'
    },
}

const sass = gulpSass(dartSass);

function compileStylesProd() {
    return gulp.src(paths.styles.src, {sourcemaps: true})
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(
        postcss([
            autoprefixer({
                grid: true,
            })]))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(csso())
        .pipe(rename('style.min.css'))    
        .pipe(gulp.dest(paths.styles.dest, {sourcemaps: '.'}));
  }

function compileStyles() {
    return gulp.src(paths.styles.src)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(
        postcss([
            autoprefixer({
                grid: true,
            })]))
        .pipe(csso())
        .pipe(rename('style.min.css'))    
        .pipe(gulp.dest(paths.styles.dest));
}

export {compileStyles, compileStylesProd};