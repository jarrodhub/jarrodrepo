var gulp = require('gulp');
var ngmin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');

gulp.task('default', function() {
	gulp.src('app/js/**/*.js')
	.pipe(ngmin())
	.pipe(uglify())
	.pipe(concat("all.js"))
	.pipe(gulp.dest('dist'));

});
gulp.task('clean', function() {
	gulp.src('dist/**')
	.pipe(clean());
});
// npm install -g gulp
// npm install --save-dev gulp gulp-util
// npm install --save-dev gulp-ngmin gulp-uglify gulp-concat 
