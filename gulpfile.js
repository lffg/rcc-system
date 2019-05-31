const chalk = require('chalk')
const gulp = require('gulp')
const prefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const path = require('path')

/**
 * ---------------------------------------------------------------------
 * Constants and utils.
 * ---------------------------------------------------------------------
 */

const SRC_PATHS = {
  sass: path.join(__dirname, 'resources/assets/sass/*.scss'),
  js: path.join(__dirname, 'resources/assets/js/**/*.js')
}

const WATCH_PATHS = {
  sass: [
    path.join(__dirname, 'resources/assets/sass/**/**/*.scss'),
    path.join(__dirname, 'resources/assets/sass/**/**/**/*.scss')
  ],
  js: path.join(__dirname, 'resources', 'assets', 'js', '**', '*.js')
}

const DEST_PATHS = {
  sass: path.join(__dirname, 'public/css'),
  js: path.join(__dirname, 'public/js')
}

const countTask = (() => {
  let taskNumber = 1

  return (taskName, color = 'yellow') => {
    const title = chalk.bgWhite.black('[  TASK  ]')
    const task = chalk[color](`[${taskName}]`)
    const number = chalk.blue(`${taskNumber++}`.padStart(4, '0'))
    console.log(chalk.bold(`${title} ${task}: ${number}`))
  }
})()

/**
 * ---------------------------------------------------------------------
 * Tasks.
 * ---------------------------------------------------------------------
 */

function sassTask(done) {
  countTask('Sass', 'magenta')

  gulp
    .src(SRC_PATHS.sass)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(
      prefixer({
        browsers: ['last 4 versions']
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DEST_PATHS.sass))

  done()
}

function jsTask(done) {
  countTask('JS', 'yellow')

  gulp
    .src(SRC_PATHS.js)
    .pipe(concat('index.js'))
    .pipe(gulp.dest(DEST_PATHS.js))

  done()
}

function watchTask(done) {
  gulp.watch(WATCH_PATHS.js, () => jsTask)
  gulp.watch(WATCH_PATHS.sass, () => sassTask)

  done()
}

exports.__js = jsTask
exports.__sass = sassTask
exports.__watch = watchTask
exports.build = gulp.series(jsTask, sassTask)
exports.default = exports.dev = gulp.series(jsTask, sassTask, watchTask)
