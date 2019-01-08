/**
 * Required imports of dependency packages.
 */
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create();

/**
 * Task to preview the dist directory for tests
 * 
 * @param  {Task Name} 'preview'
 * @param  {Array Dependency} []
 * @param  {callback function}
 */
gulp.task('preview', [], () => {
    return browserSync.init({
        notify: false,
        server: {
            baseDir: 'dist'
        }
    });
});

/**
 * Task to clean up and remove dist folder
 * before piping new files to dist
 *
 * @param  {Task Name} 'deleteDist'
 * @param  {Array Dependency} ['icons']
 * @param  {callback function}
 */
gulp.task('deleteDist', ['icons'], () => {
    return del('./dist');
});

/**
 * Task to copy any and all other project files
 *
 * @param  {Task Name} 'preview'
 * @param  {Array Dependency} ['deleteDist']
 * @param  {callback} function
 */
gulp.task('copyGeneral', ['deleteDist'], () => {
    var pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ];

    return gulp
            .src(pathsToCopy)
            .pipe(gulp.dest('./dist'));
});

/**
 * Task to compress all images
 * and copy to dist directory
 *
 * @param  {Task Name} 'preview'
 * @param  {Array Dependency} ['deleteDist']
 * @param  {callback function}
 */
gulp.task("imageOptimize", ['deleteDist'], () => {
    return gulp
            .src([
                './app/assets/images/**/*',
                '!./app/assets/images/icons',
                '!./app/assets/icons/**/*'
            ])
            .pipe(imagemin({
                progressive: true, // JPEG images
                interlaced: true, // GIF images
                multipass: true // SVG images
            }))
            .pipe(gulp.dest('./dist/assets/images'));
});

/**
 * Task to start the 'usemin' task
 * after clean up of dist directory
 *
 * @param  {Task Name} 'preview'
 * @param  {Array Dependency} ['deleteDist']
 * @param  {callback function}
 */
gulp.task('useminStart', ['deleteDist'], () => {
    gulp.start('usemin');
    console.log('Finishing Usemin Task');
});

/**
 * Task to compress and move scripts, stylesheets and
 * index.html to dist directory
 * 
 *
 * @param  {Task Name} 'usemin'
 * @param  {Array Dependency} ['styles', 'scripts']
 * @param  {callback function}
 */
gulp.task('usemin', ['styles', 'scripts'], () => {
    console.log('Starting Usemin Task');
    return gulp
            .src('./app/index.html')
                .pipe(usemin({
                    // First perform revision on CSS file -- Adds caching hash to end of file
                    // Then Compress CSS file
                    css: [
                        function () {
                            // console.log('Revising CSS to Dist Directory');
                            return rev();
                        },
                        function () {
                            // console.log('Minifying CSS to Dist Directory');
                            return cssnano();
                        }
                    ],
                    // First perform revision of JS file -- Adds caching hash to end of file
                    // Then Compress JS file
                    js: [
                        function () {
                            // console.log('Revising JS to Dist Directory');
                            return rev();
                        },
                        function () {
                        // console.log('Minifying JS to Dist Directory');
                        return uglify();
                    }
                ]
            }))
            .pipe(gulp.dest('./dist'));
});

/**
 * Task to run all build tasks
 * Clean dist folder
 * Copy generic files
 * Optimize images
 * Compress files
 *
 * @param  {Task Name} 'build'
 * @param  {Array Dependency} ['deleteDist', 'copyGeneral', 'imageOptimize', 'useminStart']
 */
gulp.task('build', ['deleteDist', 'copyGeneral', 'imageOptimize', 'useminStart']);


