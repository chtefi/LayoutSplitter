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

// es6ify.traceurOverrides = {
//     experimental: true
// };

// var PATHS = {
//     app: './src/components/App.jsx',
//     components: './src/components/**/*.jsx',
//     less: ['./src/styles/**/*.css', './src/styles/**/*.less'],
//     build_client: './build/client/',
//     build_server: './build/server/',
//     html: './src/index.html',
//     js: ['./src/stores/**/*.js', './src/libs/**/*.js' ],
//     server:  ['./src/server.js', './package.json']
// };
// var BUNDLE_NAME = 'bundle.js';
// var STYLESHEET_NAME = 'bundle.css';

// gulp.task('js', function() {
//     browserify(PATHS.app)
//         .transform({ es6: true }, reactify)
//         //.transform({ sourcemap: false }, uglify) // with only that, the whole bundle wont be minified
//         .bundle()
//         //.pipe(uglify(null, { sourcemap: false }))
//         .on('error', function(err) { console.error('js', err); })
//         .pipe(source(BUNDLE_NAME))        
//         .pipe(gulp.dest(PATHS.build_client))
//         .pipe(livereload());
// });

// gulp.task('server', function() {
//      gulp.src(PATHS.server)
//         .pipe(es6ify())
//         .pipe(gulp.dest(PATHS.build_server))
// });

// gulp.task('html', function() {
//     gulp.src(PATHS.html)
//         .pipe(gulp.dest(PATHS.build_client))
//         .pipe(livereload());
// });

// gulp.task('less', function() {
//     var processors = [
//         // autoprefixer({browsers: ['last 2 version']}),
//         csswring
//     ];
//     gulp.src(PATHS.less)
//         .on('error', function(err) { console.error('less', err); })
//         .pipe(less())        
//         .pipe(concat(STYLESHEET_NAME))
//         .pipe(postcss(processors))
//         .pipe(gulp.dest(PATHS.build_client))
//         .pipe(livereload());
// });

// gulp.task('watch', function() {
//     livereload.listen();
//     gulp.watch([PATHS.components, PATHS.js], ['js']);
//     gulp.watch([PATHS.less], ['less']);
//     gulp.watch([PATHS.html], ['html']);
// });

// gulp.task('default', ['js', 'less', 'html', 'server'], function() {

// });


// gulp.task('autobuild', ['js', 'less', 'html', 'server'], function() {
//     gulp.watch([PATHS.components, PATHS.js], ['js']);
//     gulp.watch([PATHS.less], ['less']);
//     gulp.watch([PATHS.html], ['html']);
//     gulp.watch([PATHS.server], ['server']);
// });