import gulp from "gulp";
import ghPages from "gulp-gh-pages";
import jsonServer from "gulp-json-srv";

import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path,
  gulp,
  plugins,
};

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { sass } from "./gulp/tasks/sass.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { server } from "./gulp/tasks/server.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprite } from "./gulp/tasks/svgSprite.js";
import { zip } from "./gulp/tasks/zip.js";

// Наблюдатель за изменениями в файлах
const watcher = () => {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.sass, sass);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
};

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
const mainTask = gulp.series(fonts, gulp.parallel(copy, html, sass, js, images));

// Построение сценариев выполнения задач
const serve = () => {
  const srvr = jsonServer.create({
    port: 3001,
  });
  return gulp.src("./src/server/data.json").pipe(srvr.pipe());
};
const dev = gulp.series(reset, mainTask, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTask);
const deployZip = gulp.series(reset, mainTask, zip);

gulp.task("serve", serve);
gulp.task("dev", dev);
gulp.task("build", build);
gulp.task("svg-sprite", svgSprite);
gulp.task("zip", deployZip);

gulp.task("deploy", () => gulp.src("./dist/**/*").pipe(ghPages()));
