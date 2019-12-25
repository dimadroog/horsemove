var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var replace = require('gulp-replace');

gulp.task('scripts', function () {
    return gulp.src(['static/js/*vue*', 'static/js/*.js'])
    	.pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function () {
    return gulp.src(['static/css/*bootstrap*', 'static/css/*.css'])
    	.pipe(concat('styles.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('rename-bg-images', function() {
	return gulp.src('dist/css/styles.min.css')
		.pipe(replace('../img', '../../static/img'))
		.pipe(gulp.dest('dist/css'));
});



