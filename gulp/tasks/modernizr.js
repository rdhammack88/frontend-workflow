/**
 * Required imports of dependency packages.
 */
var gulp = require('gulp'),
    modernizr = require('gulp-modernizr');

/**
 * Task to add classes to HTML element
 * for modernizr features 
 * 
 * @param  {Task Name} 'modernizr'
 * @param  {callback function}
 */
gulp.task('modernizr', () => {
    return gulp
            .src([
                'pipe./app/assets/styles/**/*.scss',
                './app/assets/scripts/**/*.js'
            ])
            .pipe(modernizr({
                options: ['setClasses']
            }))
            .pipe(gulp.dest('./app/temp/scripts'));
})