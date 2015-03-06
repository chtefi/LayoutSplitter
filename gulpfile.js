/* global require */

var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var uglify = require('uglifyify');
var less = require('gulp-less');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');

var PATHS = {
    app: './src/components/app.jsx',
    components: './src/components/**/*.jsx',
    less: ['./src/styles/**/*.css', './src/styles/**/*.less'],
    build: './build/client/',
    html: './src/index.html'
}
var JS_BUNDLE_NAME = 'bundle.js';
var CSS_BUNDLE_NAME = 'bundle.css';

gulp.task('js', function() {
    browserify(PATHS.app)
        .transform(reactify)
        .bundle()
        //.pipe(uglify(null, { sourcemap: false }))
        .on('error', function(err) { console.error('js', err); })
        .pipe(source(JS_BUNDLE_NAME))        
        .pipe(gulp.dest(PATHS.build))
        .pipe(livereload());
});

gulp.task('html', function() {
    gulp.src(PATHS.html)
        .pipe(gulp.dest(PATHS.build))
        .pipe(livereload());
});

gulp.task('less', function() {
    gulp.src(PATHS.less)
        .on('error', function(err) { console.error('less', err); })
        .pipe(less())        
        .pipe(concat(CSS_BUNDLE_NAME))
        .pipe(gulp.dest(PATHS.build))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch([PATHS.components], ['js']);
    gulp.watch([PATHS.less], ['less']);
    gulp.watch([PATHS.html], ['html']);
});

gulp.task('default', ['js', 'less', 'html'], function() {

});
