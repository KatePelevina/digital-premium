const { task } = require('gulp');
let gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');

    
gulp.task('clean', async function(){
    del.sync('dist')
});

gulp.task('html', () => {
    return gulp.src([
        'src/**/*.html'
    ])
        .pipe(rigger())
        .pipe(gulp.dest('dist/'))
});

gulp.task('scss', function(){
    return gulp.src('src/assets/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle:'compressed'}))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions']
        }))
        .pipe(rename({suffix:'.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/css'))
});

gulp.task('css', () => {
    return gulp.src('src/assets/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/assets/css'))
});

gulp.task('css-libs', function(){
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css'
    ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('src/assets/scss'))
});

gulp.task('script', function() {
    return gulp.src('src/assets/js/*.js')
    .pipe(gulp.dest('dist/assets/js'))
});

gulp.task('js', function(){
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/slick-carousel/slick/slick.js'                     
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
});

gulp.task('image', function () {
    gulp.src('src/assets/images/**/*.*')
        .pipe(imagemin({
            progessive: true
        }))
        .pipe(gulp.dest('dist/assets/images'))
});
gulp.task('font', function () {
    gulp.src('src/assets/font/**/*.*')
    .pipe(gulp.dest('dist/assets/font'))
});

gulp.task('watch', function(){
    gulp.watch('src/assets/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('src/*.html', gulp.parallel('html'));
    gulp.watch('src/assets/js/*.js', gulp.parallel('script'));
});

gulp.task('default', gulp.parallel('html', 'scss', 'css', 'css-libs', 'js', 'script', 'image', 'font', 'watch'));