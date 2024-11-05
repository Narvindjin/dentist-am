import gulp from 'gulp';
import browserSync from 'browser-sync';
import { deleteAsync } from 'del';
import {compileStyles, compileStylesProd} from './gulp/compileStyles.js';
import { copy, copyImages, copySvg } from './gulp/copyAssets.js';
import {compileScripts, compileScriptsProd} from './gulp/compileScripts.js';
import {optimizeSvg, createWebp, optimizePng, optimizeJpg} from './gulp/optimizeImages.js';

const server = browserSync.create();
const streamStyles = () => compileStyles().pipe(server.stream());

const clean = () => deleteAsync('build');

const syncServer = () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch('src/**.html', gulp.series(copy, refresh));
  gulp.watch('src/styles/**/*.{scss,sass}', streamStyles);
  gulp.watch('src/js/**/*.{js,json}', gulp.series(compileScriptsProd, refresh));
  gulp.watch('src/data/**/*.{js,json}', gulp.series(copy, refresh));
  gulp.watch('src/img/**/*.svg', gulp.series(copySvg, refresh));
  gulp.watch('src/img/**/*.{png,jpg,webp}', gulp.series(copyImages, refresh));

  gulp.watch('src/favicon/**', gulp.series(copy, refresh));
  gulp.watch('src/video/**', gulp.series(copy, refresh));
  gulp.watch('src/downloads/**', gulp.series(copy, refresh));
  gulp.watch('src/*.php', gulp.series(copy, refresh));
};

const refresh = (done) => {
  server.reload();
  done();
};

const build = gulp.series(clean, copy, gulp.parallel(compileStyles, compileScripts, optimizePng, optimizeJpg, optimizeSvg, createWebp));
const dev = gulp.series(clean, copy, gulp.parallel(compileScripts, compileStyles, optimizePng, optimizeJpg, optimizeSvg), syncServer);
const start = gulp.series(clean, copy, gulp.parallel(compileStylesProd, compileScriptsProd), syncServer);

export { createWebp as webp, build, start, dev};