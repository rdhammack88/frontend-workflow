/**
 * Required imports of dependency packages.
 */
var gulp = require("gulp"),
	rename = require("gulp-rename"),
	del = require("del"),
	svgSprite = require("gulp-svg-sprite"),
	svg2png = require("gulp-svg2png");


/**
 * 
 * Configuration Object for the "createSprite" task
 * 
 */
var config = {
    shape: {
        spacing: {
            padding: 1
        }
    },
    mode: {
        css: {
            variables: {
                replaceSvgWithPng: () => {
                    return (sprite, render) => {
                        return render(sprite).split('svg').join('.png');
                    }
                }
            },
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
}

/**
 * Clean up directories and remove old copies of image sprites,
 * used for adding and removing icons from the sprite
 *
 * @param  {Task Name} 'clean'
 * @param  {callback function}
 */
gulp.task('clean', () => {
    return del([
        './app/temp/sprite',
        './app/assets/images/sprites'
    ]);
});

/**
 * Create the sprite file and store it in the ./app/temp/sprite directory
 *
 * @param  {Task Name} 'createSprite'
 * @param  {Array Dependency} ['clean']
 * @param  {callback function}
 */
gulp.task('createSprite', ['clean'], () => {
    return gulp
            .src('./app/assets/images/icons/**/*.svg')
            .pipe(svgSprite(config))
            .pipe(gulp.dest('./app/temp/sprite/'));
});

/**
 * Create a PNG copy of all SVG images for legacy browser support
 *
 * @param  {Task Name} 'createPngCopy'
 * @param  {Array Dependency} ['createSprite']
 * @param  {callback function}
 */
gulp.task('createPngCopy', ['createSprite'], () => {
    return gulp
            .src('./app/temp/sprite/css/*.svg')
            .pipe(svg2png())
            .pipe(gulp.dest('./app/temp/sprite/css'));
});

/** 
 * New copySpriteGraphic Gulp Task using the 
 * createPngCopy Gulp Task as the dependency.
 *
 * Must NOT put space between {svg,png}
 *
 * @param  {Task Name} 'copySpriteGraphic'
 * @param  {Array Dependency} ['createPngCopy']
 * @param  {callback function}
 */
gulp.task('copySpriteGraphic', ['createPngCopy',], () => {
    return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
        .pipe(gulp.dest('./app/assets/images/sprites'));
});

/**
 * Copy the sprite file into the ./app/assets/styles/modules directory
 *
 * @param  {Task Name} 'copySpriteCSS'
 * @param  {Array Dependency} ['createSprite']
 * @param  {callback function}
 */
gulp.task('copySpriteCSS', ['createSprite'], () => {
    return gulp.src('./app/temp/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./app/assets/styles/modules'));
});

/**
 * Remove the ./app/temp/sprite directory
 *
 * @param  {Task Name} 'endClean'
 * @param  {Array Dependency} ['copySpriteGraphic', 'copySpriteCSS']
 * @param  {callback function}
 */
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], () => {
    return del('./app/temp/sprite');
});

/**
 * Run all Gulp sprite tasks
 *
 * @param  {Task Name} 'icons'
 * @param  {Array Dependency} ['clean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']
 * @param  {callback function}
 */
gulp.task('icons', ['clean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);