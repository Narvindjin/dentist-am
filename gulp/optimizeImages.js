import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import webp from 'imagemin-webp';;
import pngQuant from 'imagemin-pngquant';
import mozJpeg from 'imagemin-mozjpeg';
import svgo from 'imagemin-svgo';
import extReplace from 'gulp-ext-replace'

const optimizeSvg = () =>
  gulp
      .src('src/img/**/*.svg', {
        encoding: false,
      })
      .pipe(
          imagemin([
            svgo({
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
                {
                  name: 'removeRasterImages',
                  active: true,
                },
                {
                  name: 'removeUselessStrokeAndFill',
                  active: false,
                }],
            })]))
      .pipe(gulp.dest('build/img'));

const optimizeJpg = () =>
  gulp
      .src('src/img/**/*.{jpg,jpeg}', {
        encoding: false,
      })
      .pipe(imagemin([mozJpeg({quality: 90})]))
      .pipe(gulp.dest('build/img'));

const optimizePng = () =>
  gulp
      .src('src/img/**/*.png', {
        encoding: false,
      })
      .pipe(
          imagemin([
            pngQuant({
              strip: true,
              quality: [0.8, 0.9],
            })]))
      .pipe(gulp.dest('build/img'));

const createWebp = () => {
  const root = '';
  return gulp
      .src(`build/img/${root}**/*.{png,jpg}`, {
        encoding: false,
      })
      .pipe(imagemin([
        webp({
          quality: 90,
        })
      ]))
      .pipe(extReplace('.webp'))
      .pipe(gulp.dest(`build/img/${root}`));
};

export { createWebp, optimizeSvg, optimizePng, optimizeJpg};