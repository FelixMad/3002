var gulp       = require('gulp'),
    ts         = require('gulp-typescript')
    gls        = require('gulp-live-server'),
    sourcemaps = require('gulp-sourcemaps'),
    ip         = require('ip'),
    $build     = 'build',
    $port      = 3002,
    $address   = ip.address();
 
 gulp.task('typescript', function () {
	return gulp.src('src/ts/*.ts')
        .pipe(sourcemaps.init())
		.pipe(ts({
			noImplicitAny: true,
			out: 'output.js'
		}))
        .pipe(sourcemaps.write())
		.pipe(gulp.dest('build/js'));
});

gulp.task('typescript:watch', function(){
    gulp.watch('src/ts/*.ts',['typescript']);
});

gulp.task('server', function() {
	var server = gls.static($build, $port);
	server.start();
    
    var options = {
        uri: 'http://'+ $address +':' + $port,
        app: 'google chrome'
    };
    gulp.src(__filename)
        .pipe(open(options));

	gulp.watch([$build + '/js/*.js'], function (file) {
		server.notify.apply(server, [file]);
	});
});

gulp.task('default', ['typescript']);
	