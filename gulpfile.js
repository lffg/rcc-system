/**
 * ---------------------------------------------------------------------
 * Module dependencies.
 * ---------------------------------------------------------------------
 */

const gulp       = require('gulp')
const path       = require('path')
const plumber    = require('gulp-plumber')
const concat     = require('gulp-concat')
const sass       = require('gulp-sass')
const prefixer   = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')

/**
 * ---------------------------------------------------------------------
 * Constants & options.
 * ---------------------------------------------------------------------
 */

const SRC_PATHS = {
  sass: path.join(__dirname, 'resources', 'assets', 'sass', '*.scss'),
  js: path.join(__dirname, 'resources', 'assets', 'js', '**', '*.js')
}

const WATCH_PATHS = {
  sass: [
    path.join(__dirname, 'resources', 'assets', 'sass', '**', '**', '*.scss'),
    path.join(__dirname, 'resources', 'assets', 'sass', '**', '**', '*.scss'),
    path.join(__dirname, 'resources', 'assets', 'sass', '**', '**', '**', '*.scss')
  ],
  js: path.join(__dirname, 'resources', 'assets', 'js', '**', '*.js')
}

const DEST_PATHS = {
  sass: path.join(__dirname, 'public', 'css'),
  js: path.join(__dirname, 'public', 'js')
}

/**
 * ---------------------------------------------------------------------
 * Tasks.
 * ---------------------------------------------------------------------
 */
let taskCount = 1

gulp.task('build', ['sass', 'js'])
gulp.task('dev', ['build', 'watch'])
gulp.task('default', ['dev']) // alias to `gulp dev`

gulp.task('watch', () => {
  gulp.watch(WATCH_PATHS.sass, ['sass'])
  gulp.watch(WATCH_PATHS.js, ['js'])
})

gulp.task('sass', () => {
  console.log(`[  TASK  ] [SASS] Número da task do gulp do processo: ${taskCount}.`)
  taskCount = taskCount + 1

  return gulp.src(SRC_PATHS.sass)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(prefixer({
      browsers: ['last 4 versions']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DEST_PATHS.sass))
})

gulp.task('js', () => {
  console.log(`[  TASK  ] [ JS ] Número da task do gulp do processo: ${taskCount}.`)
  taskCount = taskCount + 1

  return gulp.src(SRC_PATHS.js)
    .pipe(concat('index.js'))
    .pipe(gulp.dest(DEST_PATHS.js))
})
