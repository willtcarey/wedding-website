var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// compile scss to css
const buildSass = function () {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({basename: 'styles.min'}))
        .pipe(gulp.dest('./css'));
}
gulp.task('sass', buildSass);

// watch changes in scss files and run sass task
const sassWatch = function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
}
gulp.task('sass:watch', sassWatch);

// minify js
const minifyjs = function () {
    return gulp.src('./js/scripts.js')
        .pipe(uglify())
        .pipe(rename({basename: 'scripts.min'}))
        .pipe(gulp.dest('./js'));
}
gulp.task('minify-js', minifyjs);

// default task
gulp.task('default', gulp.parallel(buildSass, minifyjs));