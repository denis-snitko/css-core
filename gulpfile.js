const projectFolder = require('path').basename('deploy')

const path = {
  build: {
    css: projectFolder,
  },

  src: {
    css: './scss/*.scss',
  },

  watch: {
    css: './**/*.scss',
  },

  clean: projectFolder,
}

const {src, dest} = require('gulp')
const gulp = require('gulp')
const del = require('del')
const scss = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const groupMedia = require('gulp-group-css-media-queries')
const cleanCss = require('gulp-clean-css')

function css() {
  return src(path.src.css)
    .pipe(scss({
      outputStyle: 'compressed',
    }),)
    .pipe(groupMedia())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 5 versions'], cascade: true,
    }),)
    .pipe(dest(path.build.css))
    .pipe(cleanCss())
  // Раскомментировать, если надо min.css
  // .pipe(
  //   rename({
  //     extname: '.min.css',
  //   }),
  // )
  // .pipe(dest(path.build.css))
}

function watchFiles() {
  gulp.watch([path.watch.css], css)
}

function clean() {
  return del(path.clean)
}

let build = gulp.series(gulp.parallel(css))
let watch = gulp.parallel(build, watchFiles)

exports.css = css
exports.clean = clean
exports.default = watch
