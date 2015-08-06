var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
//var path = require('path');

// ES6
var babel = require('gulp-babel');
var concat = require('gulp-concat');


//environment
var env = require('gulp-env');
var matches = require('gulp-if');
var uglify = require('gulp-uglify');

var prefixOptions = {
    browsers: ['last 8 versions', '> 1%'],
    cascade: true
};


var isDev = function() {
    return process.env.NODE_ENV == 'development';
};

var isProd = function() {
    return process.env.NODE_ENV == 'production';
};


gulp.task('sass', function() {
    return gulp.src('./app/css/sass/style.sass')  // only compile the entry file
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefix(prefixOptions))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(livereload());
});

gulp.task('es6', function() {
    return gulp.src('./app/js/**/*.js')  // only compile the entry file
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(matches(isProd(), uglify()))
        .pipe(matches(isDev(), sourcemaps.write('./maps')))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(livereload());
});


gulp.task('watch-sass', function() {
    gulp.watch('./app/css/**/*.sass', ['sass']);
});

gulp.task('watch-es6', function() {
    gulp.watch('./app/js/**/*.js', ['es6']);
});

gulp.task('set-env', function() {
    env({
        vars: {
            NODE_ENV: 'development'
        }
    });
});

gulp.task('default', ['set-env', 'watch-sass', 'watch-es6']); // Default will run the 'entry' watch task
