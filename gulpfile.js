const gulp = require('gulp');
const ts = require('gulp-typescript');
const cleanup = require('gulp-cleanup-dest');

const tsc = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
    return tsc.src()
        .pipe(cleanup({ dest: 'app_data', ext: '.js' }))
        .pipe(tsc())
        .pipe(gulp.dest('app_data'));
});

gulp.task('watch', ['scripts'], () => {
    gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('default', ['watch']);
