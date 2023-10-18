import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = "./dist";
const srcFolder = "./src";

export const path = {
  build: {
    files: `${buildFolder}/files/`,
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    js: `${buildFolder}/js/`,
  },
  src: {
    files: `${srcFolder}/files/**/*.*`,
    html: `${srcFolder}/*.html`,
    sass: `${srcFolder}/sass/style.sass`,
    js: `${srcFolder}/js/app.js`,
    fonts: `${srcFolder}/fonts/`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    svgIcons: `${srcFolder}/svg-icons/*.svg`
  },
  watch: {
    files: `${srcFolder}/files/**/*.*`,
    html: `${srcFolder}/**/*.html`,
    sass: `${srcFolder}/sass/**/*.sass`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
    js: `${srcFolder}/js/**/*.js`,
  },
  clean: buildFolder,
  srcFolder: srcFolder,
  buildFolder,
  rootFolder,
  ftp: "",
};
