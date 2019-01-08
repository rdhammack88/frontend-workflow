/**
 * Required imports of dependency packages.
 */
var gulp = require('gulp'),
    webpack = require('webpack');

/**
 * Task to run "scripts" task
 * Dependent on "modernizr" task to
 * run successfully
 * 
 * @param  {Task Name} 'scripts'
 * @param  {Array Dependency} ['modernizr']
 * @param  {callback function}
 */
gulp.task('scripts', ['modernizr'], () => {
    return webpack(require('../../webpack.config.js'), (err, stats) => {
        if(err) {
            console.log(err.toString());
        }
        console.log('Webpack Compilation Completed!');
    });
});