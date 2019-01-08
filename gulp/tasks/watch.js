/**
 * Required imports of dependency packages.
 */
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();
/**
 * Watch Task
 * To trigger a change with browserSync.reload() method,
 * to reload the html page. 
 * 
 * Starts the "cssInject" task to
 * trigger any changes in the SASS files.
 * 
 * Starts the "scriptsRefresh" task to
 * trigger any changes in any JS files.
 * 
 * @param  {Task Name} 'watch'
 * @param  {callback function}
 */
gulp.task('watch', () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: 'app'
        }
    });

    watch('./app/index.html', () => {
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.scss', () => {
        gulp.start('cssInject');
    });

    watch('./app/assets/scripts/**/*.js', () => {
        gulp.start('scriptsRefresh');
    });
});

/**
 * gulp -> cssInject task.
 * Using the styles task as a dependecy
 * Start the browserSync.stream() method
 * to watch for changes in the SASS files 
 * and inject them into the HTML.
 * Being watched under the gulp -> watch task.
 *
 * @param  {Task Name} 'cssInject'
 * @param  {Array Dependency} ['styles']
 * @param  {callback function}
 */
gulp.task('cssInject', ['styles'], () => {
    return gulp
            .src('./app/temp/styles.css')
            .pipe(browserSync.stream());
});

/**
 * gulp -> cssInject task.
 * Using the styles task as a dependecy,
 * Start the browserSync.stream() method
 * to watch for changes in the SASS files
 * and inject them into the HTML.
 * Being watched under the gulp -> watch task.
 *
 * @param  {Task Name} 'scriptsRefresh'
 * @param  {Array Dependency} ['scripts']
 * @param  {callback function}
 */
gulp.task('scriptsRefresh', ['scripts'], () => {
    browserSync.reload();
});