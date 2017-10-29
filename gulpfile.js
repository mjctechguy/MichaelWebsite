var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var fontAwesome = require('node-font-awesome');
//var uglifycss = require('gulp-uglifycss');

gulp.task('fonts', function () {
    gulp.src(fontAwesome.fonts)
        .pipe(gulp.dest('./fonts/'));
});

gulp.task('styles', function () {
    gulp.src('./styles/scss/main.scss')
        .pipe(sass({
            includePaths: [fontAwesome.scssPath, require('node-normalize-scss').includePaths]
        }))
        .pipe(gulp.dest('./styles/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./scss/*.scss', ['styles']);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
})


gulp.task('default', ['fonts', 'styles', 'serve']);

//Production

gulp.task('HTMLProductions', function() {
    gulp.src('*.html').pipe(gulp.dest('production'));
})

gulp.task('fontsProduction', function () {
    gulp.src(fontAwesome.fonts)
        .pipe(gulp.dest('./production/fonts/'));
});

gulp.task('stylesProduction', function () {
    gulp.src('./styles/scss/main.scss')
        .pipe(sass({
            includePaths: [fontAwesome.scssPath, require('node-normalize-scss').includePaths]
        }))
        .pipe(gulp.dest('./production/styles/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('buildProduction', ['fontsProduction', 'HTMLProductions', 'stylesProduction']);