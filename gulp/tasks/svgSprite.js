import svgSprive from "gulp-svg-sprite";

export const svgSprite = () =>
  app.gulp
    .src(app.path.src.svgIcons, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SVG",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      svgSprive({
        mode: {
          stack: {
            sprite: `../icons/icons.svg`,
            example: app.isDev,
          },
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.images));
