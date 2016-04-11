var gulp       = require('gulp'),
    ts         = require('gulp-typescript')
    sourcemaps = require('gulp-sourcemaps');
 
 gulp.task('typescript', function () {
	return gulp.src('src/ts/*.ts')
        .pipe(sourcemaps.init())
		.pipe(ts({
			noImplicitAny: true,
			out: 'output.js'
		}))
        .pipe(sourcemaps.write())
		.pipe(gulp.dest('built/js'));
});

gulp.task('typescript:watch', function(){
    gulp.watch('src/ts/*.ts',['typescript']);
});

 
gulp.task('default', ['typescript']);
	