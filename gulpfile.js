const path = require('path');
const config = require('config');
const gulp = require('gulp');
const sass = require('gulp-sass');
const fs = require('fs');
const electronConnect = require('electron-connect').server.create({
    logLevel: 0,
    stopOnClose: true,
    port: config.get('debugPort')
});

gulp.task('styles', () => {
    return gulp
        .src(['app/assets/scss/main.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/assets/css/'));
});

gulp.task('server', () => {

    fs.writeFile(path.join(__dirname, 'config/local.json'), JSON.stringify({ debug: true }), { flag: 'wx' }, err => {
        if(err && err.code === 'EEXIST') {
            console.log('local.json already exits');
        } else {
            console.log('Created local.json');
        }
    });

    electronConnect.start(state => {
        if(state === 'stopped') process.exit();
    });

    gulp.watch([
        'index.js',
        'config/*.json'
    ], electronConnect.restart);

    gulp.watch('app/assets/scss/**/*.scss', [
        'styles',
        electronConnect.reload
    ]);

    gulp.watch([
        'app/**/*.html',
        'app/**/*.js'
    ], electronConnect.reload);

});

gulp.task('default', ['styles', 'server']);
