import gulp from 'gulp';
import plumber from 'gulp-plumber';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import { deleteAsync } from 'del';
import webp from 'gulp-webp';
import webpack from 'webpack-stream';
import svgo from 'gulp-svgmin';
import rename from 'gulp-rename';
import { stacksvg } from 'gulp-stacksvg';
import browser from 'browser-sync';
import fileinclude from 'gulp-file-include';

const sass = gulpSass(dartSass);
const isDevelopment = process.env.NODE_ENV !== 'production';

const PROJECT_FOLDER = '.';
const SRC_FOLDER = '.';
const PUBLICATION_FOLDER = './build';

const path = {
  src: {
    html: `${SRC_FOLDER}/html/*.html`,
    css: `${SRC_FOLDER}/style/resource/*.scss`,
    img: `${SRC_FOLDER}/i/media-resource/**/*.{jpg,png}`,
    sprite: `${SRC_FOLDER}/i/media-resource/stat/icons/**/*.svg`,
    assets: `${SRC_FOLDER}/i/media-resource/**/*`,
    js: `${SRC_FOLDER}/js/common/**/*.js`,
  },
  build: {
    html: `${PROJECT_FOLDER}/`,
    css: `${PROJECT_FOLDER}/style/modules/`,
    js: `${PROJECT_FOLDER}/js/modules/`,
    img: `${PROJECT_FOLDER}/i/media/`,
    sprite: `${PROJECT_FOLDER}/i/media/stat/`,
    assets: `${PROJECT_FOLDER}/i/media`,
  },
  publication: {
    html: `${PUBLICATION_FOLDER}/`,
    css: `${PUBLICATION_FOLDER}/style/modules/`,
    js: `${PUBLICATION_FOLDER}/js/modules/`,
    img: `${PUBLICATION_FOLDER}/i/media/`,
    sprite: `${PUBLICATION_FOLDER}/i/media/stat/`,
    assets: `${PUBLICATION_FOLDER}/i/media`,
  },
  watch: {
    html: `${SRC_FOLDER}/html/**/*.html`,
    css: `${SRC_FOLDER}/style/resource/**/*.scss`,
    js: `${SRC_FOLDER}/js/common/**/*.js`,
    assets: `${SRC_FOLDER}/i/media-resource/**/*.{jpg,png}`,
  },
};

// Универсальная обработка HTML
function processMarkup(isProduction = false) {
  const destPath = isProduction ? path.publication.html : path.build.html;
  const contextPath = isProduction ? '' : '/';

  return gulp
    .src(path.src.html)
    .pipe(fileinclude({ prefix: '@@', context: { path: contextPath } }))
    .pipe(gulp.dest(destPath))
    .pipe(browser.stream());
}

// Универсальная обработка SCSS
function processStyles(isProduction = false) {
  const destPath = isProduction ? path.publication.css : path.build.css;
  const contextPath = isProduction ? '../../' : '/';

  return gulp
    .src(path.src.css, { sourcemaps: !isProduction })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(fileinclude({ prefix: '@@', context: { path: contextPath } }))
    .pipe(gulp.dest(destPath, { sourcemaps: !isProduction }))
    .pipe(browser.stream());
}

// Универсальная обработка JS
function processScript({ src, title, dest, isProduction = false }) {
  return () =>
    gulp
      .src(src)
      .pipe(
        webpack({
          mode: isProduction ? 'production' : 'development',
          module: {
            rules: [
              { test: /\.js$/i, exclude: /node_modules/, use: ['babel-loader'] },
              { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
              { test: /\.scss$/i, use: ['style-loader', 'css-loader', 'sass-loader'] },
            ],
          },
        })
      )
      .pipe(rename(title))
      .pipe(gulp.dest(dest))
      .pipe(browser.stream());
}

function processAllScripts(isProduction = false) {
  const jsPaths = [
    { title: 'animation.js', src: './js/common/animation.js' },
    // Добавляйте другие файлы по необходимости
  ];

  return gulp.parallel(
    jsPaths.map(({ src, title }) =>
      processScript({
        src,
        title,
        dest: isProduction ? path.publication.js : path.build.js,
        isProduction,
      })
    )
  );
}

// Оптимизация изображений
function optimizeImages() {
  return gulp.src(path.src.img).pipe(gulp.dest(path.build.img));
}

// Создание WebP
function createWebp(isProduction = false) {
  const destPath = isProduction ? path.publication.img : path.build.img;

  return gulp.src(path.src.img).pipe(webp()).pipe(gulp.dest(destPath));
}

// Создание SVG-спрайта
function createStack(isProduction = false) {
  const destPath = isProduction ? path.publication.sprite : path.build.sprite;

  return gulp
    .src(path.src.sprite)
    .pipe(svgo())
    .pipe(stacksvg())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(destPath));
}

// Копирование ассетов
function copyAssets(isProduction = false) {
  const destPath = isProduction ? path.publication.assets : path.build.assets;

  return gulp.src(path.src.assets, { base: 'i/media-resource' }).pipe(gulp.dest(destPath));
}

// Удаление файлов
function deleteFolders(isProduction = false) {
  const destPath = isProduction ? PUBLICATION_FOLDER : ['./*.html', path.build.assets, path.build.js, path.build.css];

  return deleteAsync(destPath);
}

// Запуск сервера
function startServer(done) {
  browser.init({
    server: {
      baseDir: './',
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Слежение за файлами
function watchFiles() {
  gulp.watch(path.watch.css, gulp.series(() => processStyles(false)));
  gulp.watch(path.watch.assets, gulp.series(() => copyAssets(false), () => createWebp(false)));
  gulp.watch(path.watch.js, processAllScripts(false));
  gulp.watch(path.watch.html, gulp.series(() => processMarkup(false), browser.reload));
}

// Компиляция проекта
function compileProject(isProduction = false) {
  return gulp.parallel(
    () => processMarkup(isProduction),
    () => processStyles(isProduction),
    processAllScripts(isProduction),
    () => copyAssets(isProduction),
    () => createStack(isProduction),
    () => createWebp(isProduction)
  );
}

// Задачи для разработки
export const runDev = gulp.series(
  async () => deleteFolders(false),
  compileProject(false),
  startServer,
  watchFiles
);

// Задачи для продакшена
export const buildProd = gulp.series(
  async () => deleteFolders(true),
  compileProject(true),
  optimizeImages
);
