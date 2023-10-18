import fs from "fs";
import fonter from "gulp-fonter-unx";
import ttf2woff2 from "gulp-ttf2woff2";

const srcFontsFolder = "./src/fonts/";

export const otfToTtf = () =>
  // Ищем файлы шрифтов .otf
  app.gulp
    .src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.fonts))
    // Конвертируем в .ttf
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    // Выгружаем в папку с результатом
    .pipe(app.gulp.dest(app.path.build.fonts));

export const ttfToWoff = () =>
  // Ищем файлы шрифтов .ttf
  app.gulp
    .src(`${app.path.build.fonts}*.ttf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      fonter({
        formats: ["woff"],
      })
    )
    // Ищем файлы .ttf
    .pipe(app.gulp.src(`${app.path.build.fonts}*.ttf`))
    // Конвертируем в .woff2
    .pipe(ttf2woff2())
    // Выгружаем в папку с результатом
    .pipe(app.gulp.dest(app.path.build.fonts));

const fontWeightsMap = {
  thin: 100,
  extralight: 200,
  light: 300,
  medium: 500,
  semibold: 600,
  bold: 700,
  extabold: 800,
  heavy: 800,
  black: 900,
};

export const fontsStyle = () => {
  let fontsStyleFileName = app.path.srcFolder + "/sass/_fonts.sass";

  if (!fs.existsSync(fontsStyleFileName)) {
    fs.open(fontsStyleFileName, "w", (err) => {
      if (err) throw err;
      console.log(`Файл ${fontsStyleFileName} создан.`);
    });

    fs.readdir(app.path.build.fonts, (err, items) => {
      if (items) {
        let c_fontFilename;
        for (let i = 0; i < items.length; i++) {
          let fontFileName = items[i].split(".")[0];
          let fontName = fontFileName.split("-")[0];
          let fontWeight = fontFileName.split("-")[1];
          fontWeight = fontWeightsMap[fontWeight.toLowerCase()]
            ? fontWeightsMap[fontWeight.toLowerCase()]
            : 400;

          if (fontFileName !== c_fontFilename) {
            let fileContent = `@include font('${fontName}', '${fontFileName}', ${fontWeight}, 'normal')\n`;

            fs.appendFile(fontsStyleFileName, fileContent, (err) => {
              if (err) throw err;
            });
          }
          c_fontFilename = fontFileName;
        }
      } else {
        console.log(
          `Папка ${app.path.build.fonts} пуста. Добавьте необходимые шрифты в формате .otf`
        );
      }
    });
  } else {
    console.log(`Файл ${fontsStyleFileName} уже существует. Удалите данный файл`);
  }

  return app.gulp.src(`${app.path.srcFolder}`);
};
