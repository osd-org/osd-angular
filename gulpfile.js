let gulp            = require('gulp'),
    iconfont        = require('gulp-iconfont'),
    iconfontCss     = require('gulp-iconfont-css');


gulp.task('iconfont', function(done){
    gulp.src(['src/assets/svg/icons/*.svg'])
        .pipe(iconfontCss({
            fontName: 'icons',
            path: 'src/assets/scss/templates/_icons.scss',
            targetPath: '../scss/_icons.scss',
            fontPath: '/assets/fonts/'
        }))
        .pipe(iconfont({
            fontName: 'icons',
            normalize: true,
            fontHeight: 1001
        }))
        .pipe(gulp.dest('src/assets/fonts/')
        );

    done();
});