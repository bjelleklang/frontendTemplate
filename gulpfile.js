var gulp = require('gulp');
var mkdirp = require('mkdirp');

// Prokject structure
gulp.task("createStructure", function(){
	mkdirp('bin/js', function (err) {
	   	if (err) console.error(err)
	});

	mkdirp('bin/gfx', function (err) {
	   	if (err) console.error(err)
	});

	mkdirp('bin/definitions', function (err) {
	   	if (err) console.error(err)
	});

	mkdirp('bin/fonts', function (err) {
	   	if (err) console.error(err)
	});

	mkdirp('bin/css', function (err) {
	   	if (err) console.error(err)
	});


	return "whee!";
});

//html
gulp.task("copyHtml", function(){
	gulp.src("html/*.html").pipe(gulp.dest("bin"))
});

// JS linting
/*var jslint = require('gulp-jslint');
 
gulp.task('lintJs', function () {
    return gulp.src(['scripts/*.js'])
            .pipe(jslint())
            .pipe(jslint.reporter('default', errorsOnly))
            .pipe(jslint.reporter('stylish', options));
});*/

// Typescript
var ts = require('gulp-typescript');
var merge = require('merge2');  // Require separate installation 
var concat = require('gulp-concat');
var minifyHtml = require('gulp-minify-html');
var ngtemplate = require('gulp-ngtemplate');
 
gulp.task('tscript', function() {
    var tsResult = gulp.src('scripts/*.ts')
        .pipe(ts({
            declaration: true,
            noExternalResolve: true
        }));
 
    return merge([
        tsResult.dts.pipe(gulp.dest('bin/definitions')),
        tsResult.js.pipe(gulp.dest('bin/js'))
    ]);
});

// SASS
var sass = require('gulp-sass');

gulp.task('sass', function() {
  gulp.src('sass/*.scss')
  .pipe(sass({style: 'expanded'}))
  .pipe(gulp.dest('bin/css'))
});


gulp.task("default", ["createStructure", "copyHtml", "sass", "tscript"]);