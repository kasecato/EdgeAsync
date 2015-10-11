var gulp = require('gulp');
var browserify = require('browserify');
var babelify= require('babelify');
var util = require('gulp-util');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-html-minifier');
var minifycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

var js_main_dir = [
    'src/js/util/**/*.js'
];

var js_edge_dir = [
    'src/js/edge/**/*.js'
];

var js_babel_src =
    'src/js/babel/app.js'
;

var css_dir = [
    'node_modules/bootstrap/dist/css/bootstrap.min.css'
  , 'src/css/style.css'
];

var html_dir = [
    'src/**/*.html'
];

var data_dir = [
    'src/data/**/*'
];

// ESLint Task
gulp.task('lint', function () {
    return gulp.src(js_dir)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

// Main Concatenate & Minify JS
gulp.task('js-main', function () {
    return gulp.src(js_main_dir)
        .pipe(concat('all.main.js'))
        .pipe(gulp.dest('dist/js'))
        //.pipe(rename('all.main.min.js'))
        //.pipe(uglify())
        //.pipe(gulp.dest('dist/js'))
        ;
});

// Edge Concatenate & Minify JS
gulp.task('js-edge', function () {
    return gulp.src(js_edge_dir)
        .pipe(concat('all.edge.js'))
        .pipe(gulp.dest('dist/js'))
        //.pipe(rename('all.edge.min.js'))
        //.pipe(uglify())
        //.pipe(gulp.dest('dist/js'))
        ;
});

// Babel & Concatenate
gulp.task('js-babel', function () {
    return browserify(js_babel_src, { debug: true })
        .add(require.resolve('babel/polyfill'))
        .transform(babelify)
        .bundle()
        .on('error', util.log.bind(util, 'Browserify Error'))
        .pipe(source('all.babel.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(uglify({ mangle: false }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
});

// Concatenate & Minify CSS
gulp.task('css', function () {
    return gulp.src(css_dir)
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename('all.min.css'))
        .pipe(minifycss({processImport: false}))
        .pipe(gulp.dest('dist/css'));
});

// Minify HTML
gulp.task('html', function() {
    gulp.src(html_dir)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});


// Copy Data
gulp.task('data', function() {
    gulp.src(data_dir)
        .pipe(gulp.dest('dist/data'))
});

// Watch
gulp.task('watch', function(){
    gulp.watch(js_main_dir, [/*'lint',*/ 'js-main']);
    gulp.watch(js_edge_dir, [/*'lint',*/ 'js-edge']);
    gulp.watch(js_babel_src, [/*'lint',*/ 'js-babel']);
    gulp.watch(css_dir, ['css']);
    gulp.watch(html_dir, ['html']);
});

// Default Task
gulp.task('default', [
    /*'lint',*/
    'js-main'
  , 'js-edge'
  , 'js-babel'
  , 'css'
  , 'html'
  , 'data'
  , 'watch'
]);

