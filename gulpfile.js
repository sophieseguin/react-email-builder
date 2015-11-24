var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    open = require("gulp-open"),
    port = process.env.port || 3031;


/* -------------------------------------------------------------------------- */
/* ---------- Scripts ------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

gulp.task('babelify', function () {

    // Browserify will bundle all our JS files together in to 1 and will let
    // us use modules in the front end
    browserify({
        entries: './app/src/scripts/main.js',
        debug: true
    })
    // Transform ES6 and JSX to ES5
    .transform(babelify, {presets: ['es2015', 'react']})
    // Bundled them all together into one file
    .bundle()
    .pipe(source('app.js'))
    // Send to distribution folder
    .pipe(gulp.dest('./app/dist/scripts'));

});


/* -------------------------------------------------------------------------- */
/* ---------- SASS ---------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

gulp.task('sass', function () {
    gulp.src('./app/src/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/dist/styles'));
});


/* -------------------------------------------------------------------------- */
/* ---------- Browser sync -------------------------------------------------- */
/* -------------------------------------------------------------------------- */

// Launch browser in a port
gulp.task('open', function () {
    var options = {
        url: 'http://localhost:' + port,
    };
    gulp.src('./app/index.html')
        .pipe(open('', options));
});


/* -------------------------------------------------------------------------- */
/* ---------- Live Reload --------------------------------------------------- */
/* -------------------------------------------------------------------------- */

// Server
gulp.task('connect', function () {
    connect.server({
        root: 'app',
        port: port,
        livereload: true
    });
});

// JS
gulp.task('liveReloadJS', function () {
    gulp.src('./app/dist/scripts/*.js')
        .pipe(connect.reload());
});

// CSS
gulp.task('liveReloadCss', function () {
    gulp.src('./app/dist/styles/*.css')
        .pipe(connect.reload());
});

// HTML
gulp.task('liveReloadHtml', function () {
    gulp.src('./app/*.html')
        .pipe(connect.reload());
});


/* -------------------------------------------------------------------------- */
/* ---------- Watch --------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

// Watch changes in files
gulp.task('watch', function () {

    gulp.watch('./app/dist/scripts/*.js', ['liveReloadJS']);
    gulp.watch('./app/dist/styles/*.css', ['liveReloadCss']);
    gulp.watch(['./app/*.html'], ['liveReloadHtml']);

    gulp.watch('./app/src/**/*.js', ['babelify']);
    gulp.watch('./app/src/styles/*.scss', ['sass']);
    
});

gulp.task('default', ['babelify', 'sass', 'watch']);

gulp.task('serve', ['babelify', 'sass', 'connect', 'open', 'watch']);
