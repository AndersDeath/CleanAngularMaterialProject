var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    mainBowerFiles = require('gulp-main-bower-files'),
    gulpFilter = require('gulp-filter'),
    bowerSrc = require('gulp-bower-src'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    flatten = require('gulp-flatten'),
    pug = require('gulp-pug'),
    htmlmin = require('gulp-htmlmin'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    ngHtml2Js = require('gulp-ng-html2js'),
    runSequence = require('run-sequence'),
    replace = require('gulp-replace'),
    clean = require('del'),
    filterJS = gulpFilter('**/*.js', {
        restore: true
    }),
    filterCSS = gulpFilter('**/*.css', {
        restore: true
    }),
    filterFont = gulpFilter('**/*.{eot,svg,ttf,woff,woff2}', {
        restore: true
    }),

    p = require('./gulp.conf.js'),
    buildDir = p.buildDir,
    srcDir = p.srcDir,
    mainModule = p.mainModule,
    indexSource = p.indexSource,
    htmSources = p.htmSources,
    jsSources = p.jsSources,
    htmDir = p.htmDir,
    mainModuleName = p.mainModuleName;

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: buildDir
        }
    });

    var opts = {
        interval: 250
    };

    gulp.watch(srcDir + "/index.pug", opts, ['index', reload]);
    gulp.watch(srcDir + "/**/*.js", opts, ['js', reload]);
    gulp.watch(srcDir + "/**/*.pug", opts, ['html', reload]);
    gulp.watch(srcDir + "/**/*.sass", opts, ['css', reload]);

});

gulp.task('index', function () {
    return gulp
        .src(indexSource)
        .pipe(pug())
        .pipe(replace('%%MAINMODULE%%', mainModuleName))
        .pipe(gulp.dest(buildDir));
});

gulp.task('html', function () {
    return gulp
        .src(htmSources)
        .pipe(gulpif(/[.](pug)/, pug({
            doctype: 'html'
        })))
        .pipe(rename({
            dirname: ''
        }))
        // .pipe(htmlmin({
        //     collapseWhitespace: true
        // }))
        .pipe(ngHtml2Js({
            moduleName: mainModule,
            prefix: 'view/'
        }))
        .pipe(concat('partials.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(htmDir));
});

gulp.task('css', function () {
    return gulp
        .src(srcDir + '/app.sass')
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(gulp.dest(buildDir + '/css'))
});

gulp.task('lib-js', function () {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(filterJS)
        .pipe(concat('lib.js'))
        // .pipe(uglify())
        .pipe(gulp.dest(buildDir + '/js'))
        .pipe(filterJS.restore)

        .pipe(filterCSS)
        .pipe(concat('lib.css'))
        // .pipe(uglify())
        .pipe(gulp.dest(buildDir + '/css'))
        .pipe(filterCSS.restore)
        .pipe(filterFont)
        .pipe(flatten({
            includeParents: -1
        }))
        .pipe(gulp.dest(buildDir + '/fonts'))
        .pipe(filterFont.restore);

});

gulp.task('js', function () {
    return gulp
        .src(jsSources)
        .pipe(concat('app.js'))
        .pipe(replace('%%MAINMODULE%%', mainModuleName))
        .pipe(gulp.dest(buildDir + '/js'));
});

gulp.task('img', function () {
    return gulp.src(srcDir + '/assets/img/**/*.{png,gif,jpg,svg,ico}')
        .pipe(gulp.dest(buildDir + '/img'));
});

gulp.task('icons', function () {
    return gulp.src(srcDir + '/assets/icons/**/*.svg')
        .pipe(gulp.dest(buildDir + '/icons'));
});

gulp.task('clean', function () {
    return clean.sync([buildDir], {
        force: false
    });
});


gulp.task('build', ['js','lib-js', 'index', 'html', 'css', 'img', 'icons']);

gulp.task('default', function (cb) {
    runSequence(
        ['build'],
        'server',
        cb
    );
});