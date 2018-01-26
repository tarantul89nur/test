var gulp         = require('gulp');
var less         = require('gulp-less');
var plumber      = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var gcmq         = require('gulp-group-css-media-queries');
var csso         = require('gulp-csso');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
var run          = require('run-sequence');
var del          = require('del');
var server       = require('browser-sync');
var jade         = require('gulp-jade')

gulp.task("clean", function() {
  return del("build");
});

gulp.task('copy-css', function() {
    return gulp.src('src/css/**/*.*', {base: 'src/css'})
      .pipe(gulp.dest('build/css'))
      .pipe(rename({suffix: '--min'}))
      .pipe(csso())
      .pipe(gulp.dest('build/css'))
      .pipe(server.reload({stream: true}))
});

gulp.task("copy-js", function() {
  return gulp.src("src/js/**/*.*", {base: 'src/js'})
    .pipe(gulp.dest('build/js'))
    .pipe(rename({suffix: '--min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(server.reload({stream: true}));
});

gulp.task('jade', function() {
    return gulp.src('src/**/*.jade')
      .pipe(jade({pretty: true}))
      .pipe(gulp.dest('build'))
      .pipe(server.reload({stream: true}))
});

gulp.task("style", function() {
  gulp.src("src/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer({
      browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions"
      ],
      cascade: false
    }))
    .pipe(gcmq())
    .pipe(gulp.dest("build/css"))
    .pipe(rename({suffix: '--min'}))
    .pipe(csso())
    .pipe(gulp.dest("build/css"))
    .pipe(server.reload({stream: true}));
});

gulp.task("serve", function() {
  server.init({
    server: "build"
  });

  gulp.watch("src/less/**/*.less", ["style"]);
  gulp.watch('src/**/*.jade', ['jade']);
  gulp.watch('src/css/**/*', ['copy-css']);
  gulp.watch('src/img/**/*', ['copy-img']);
  gulp.watch('src/fonts/**/*', ['copy-fonts']);
  gulp.watch('src/js/**/*', ['copy-js']);
});

gulp.task("build", function(fn) {
  run("clean", ["copy-css", "copy-js"], "jade", "style", fn);
});
