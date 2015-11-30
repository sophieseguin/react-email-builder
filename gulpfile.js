var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    minifyCss = require('gulp-minify-css'),
    connect = require('gulp-connect'),
    open = require("gulp-open"),
    port = process.env.port || 3031;


// Config
var autoprefixerConfig = {
    browsers: [
        'last 2 versions',
        'Android 4',
        'IE 8',
        'IE 9',
        'iOS >= 6'
    ]
};

var browserSyncConfig = {
    server: {
        baseDir: './app'
    }
};


/* -------------------------------------------------------------------------- */
/* ---------- Scripts ------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

gulp.task('scripts', function () {

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
/* ---------- Styles -------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

gulp.task('styles', function () {
    gulp.src('./app/src/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerConfig).on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(gulp.dest('./app/dist/styles'))
        .pipe(browserSync.reload({ stream: true }));
});


/* -------------------------------------------------------------------------- */
/* ---------- Watch --------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

gulp.task('watch', function () {

    // Create browserSync server
    browserSync(browserSyncConfig);

    gulp.watch('./app/src/**/*.js', ['scripts']);
    gulp.watch('./app/src/styles/*.scss', ['styles']);
    
});

gulp.task('default', ['scripts', 'styles', 'watch']);
