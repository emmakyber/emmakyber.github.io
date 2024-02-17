const gulp = require('gulp');
const imagemin = () => import('gulp-imagemin').then(module => module.default);

gulp.task('images', async function() {
  const imageminPlugin = await imagemin();
  return gulp.src('path/to/images')
    .pipe(imageminPlugin(/* options */))
    .pipe(gulp.dest('destination/path'));
});
