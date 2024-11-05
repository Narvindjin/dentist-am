import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';

const paths = {
    scripts: {
      src: 'src/js/**/*.js',
      dest: 'build/js/'
    }
  };

function compileScripts() {
    return gulp.src(paths.scripts.src, { sourcemaps: true })
      .pipe(babel({
        presets: ["@babel/preset-env"],
        targets: "last 4 years"
      }))
      .pipe(uglify())
      .pipe(gulp.dest(paths.scripts.dest));
}

function compileScriptsProd() {
    return gulp.src(paths.scripts.src)
      .pipe(babel({
        presets: ["@babel/preset-env"],
        targets: "last 4 years"
      }))
      .pipe(uglify())
      .pipe(gulp.dest(paths.scripts.dest));
}

export {compileScripts, compileScriptsProd};