const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const cp = require('child_process');
const debounce = require('lodash.debounce'); // You may need to install lodash.debounce

const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

const scssPath = '_scss/**/*.scss';
const jsPath = '_scripts/*.js';
const templatePath = [
  '*.html',
  '+(_includes|_layouts)/*.html',
  '*.yml',
  '_data/*.yml',
  '_posts/*',
];

module.exports = gulp => {
  // Debounced reload function
  const reloadBrowser = debounce(done => {
    browserSync.reload();
    done();
  }, 300); // 300 ms delay

  // Jekyll build tasks
  gulp.task('jekyll-build', done => {
    return cp.spawn(jekyll, ['build'], { stdio: 'inherit' }).on('close', done);
  });

  gulp.task('jekyll-dev', done => {
    return cp
      .spawn(jekyll, ['build', '--config', '_config.yml,_config_dev.yml'], { stdio: 'inherit' })
      .on('close', done);
  });

  // Rebuild Jekyll and reload the page, using the debounced reload
  gulp.task('jekyll-rebuild', gulp.series(['jekyll-dev'], reloadBrowser));

  gulp.task('serve', gulp.series('jekyll-dev', () => {
    browserSync.init({
      server: {
        baseDir: '_site',
      },
      open: false, // Prevents BrowserSync from automatically opening a new window
    });
  
    gulp.watch(scssPath, gulp.series(['sass', reloadBrowser]));
    gulp.watch(jsPath, gulp.series(['scripts', reloadBrowser]));
    gulp.watch(templatePath, gulp.series(['jekyll-rebuild']));
  }));
  
};
