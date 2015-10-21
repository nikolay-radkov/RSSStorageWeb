/* global require:false, open:true, console:false */
'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var del = require('del');
var sass = require('gulp-sass') ;
var eslint = require('gulp-eslint');
var babelify = require('babelify');

var config = {
	port: 8001,
	baseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		lib: './src/lib/**',
		images: './src/images/**',
		dist: './dist',
		scss: './src/scss/**/*.scss',
		mainInJs: './src/index.js',
		mainOutJs: 'bundle.js',
		mainInScss: './src/scss/main.scss'
	}
};

gulp.task('connect', function() {
	return connect.server({
		root: ['dist'],
		port: config.port,
		base: config.baseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function() {
	return gulp.src('dist/index.html')
		.pipe(open({
			uri: config.baseUrl + ':' + config.port + '/'
		}))
		.on('error', console.error.bind(console));
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js']);
	gulp.watch(config.paths.scss, ['scss']);
	gulp.watch(config.paths.scss, ['images']);
});

gulp.task('clean', function() {
	return del.sync([
		config.paths.dist
	]);
});

gulp.task('html', function() {
	return gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload())
		.on('error', console.error.bind(console));;
});

gulp.task('lib', function() {
	return gulp.src(config.paths.lib)
		.pipe(gulp.dest(config.paths.dist + '/lib'))
		.pipe(connect.reload())
		.on('error', console.error.bind(console));;
});

gulp.task('images', function() {
	return gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
		.pipe(connect.reload())
		.on('error', console.error.bind(console));;
});

gulp.task('scss', function() {
	return gulp.src(config.paths.mainInScss)
		.pipe(sass())
		.pipe(gulp.dest(config.paths.dist + '/css'))
		.pipe(connect.reload())
		.on('error', console.error.bind(console));
});

gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(eslint({
			config: 'eslint.config.json'
		}))
		.pipe(eslint.format());
});

gulp.task('js', function() {
	return browserify(config.paths.mainInJs)
		.transform(babelify.configure({ignore: "./node_modules/**"}))
		.bundle()
		.pipe(source(config.paths.mainOutJs))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload())
		.on('error', console.error.bind(console));
});

gulp.task('default', ['html', 'lib', 'js', 'scss',  'images', 'open', 'watch']);