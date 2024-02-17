const gulp = require('gulp');

module.exports = gulp => {
  gulp.task('images', async function() {
    const imageminPlugin = (await import('gulp-imagemin')).default;
    return gulp.src('path/to/images')
      .pipe(imageminPlugin(/* options */))
      .pipe(gulp.dest('destination/path'));
  });
};