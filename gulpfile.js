var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
//var path = require('path');


var prefixOptions = {
    browsers: ["last 8 versions", "> 1%"],
    cascade: true
};


gulp.task('sass', function() {
    return gulp.src('./app/css/sass/style.scss')  // only compile the entry file
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefix(prefixOptions))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(livereload());
});


gulp.task('watch-sass', function() {
    // watch styles
    gulp.watch('./app/css/sass/**/*.scss', ['sass'], function(vinyl) {
        console.log(vinyl);
    });  // Watch all the .scss files, then run the less task
});

gulp.task('default', ['watch-sass']); // Default will run the 'entry' watch task
