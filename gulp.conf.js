var conf = require('./package.json'),
    p = conf.projectSettings,
    replace = require('gulp-replace');

var buildDir = p.buildDir,
    srcDir = p.srcDir;

module.exports = {
    mainModule: p.mainModule,
    buildDir: buildDir,
    srcDir: srcDir,
    indexSource: srcDir + '/index.pug',
    htmSources: [
        srcDir + '/**/*.html',
        srcDir + '/**/*.jade',
        srcDir + '/**/*.pug'
    ],
    jsSources: [
        srcDir + '/**/*.module.js',
        srcDir + '/**/*.routes.js',
        srcDir + '/**/*.service.js',
        srcDir + '/**/!(*.spec|*.mocha|*.e2e).js'
    ],
    htmDir: buildDir + '/view',
    mainModuleName : p.mainModule
}