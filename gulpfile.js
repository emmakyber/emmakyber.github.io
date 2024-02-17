const gulp = require('gulp');
const sassTask = require('./build/sass');
const scriptsTask = require('./build/scripts');
const imagesTask = require('./build/images');
const browserSyncTask = require('./build/browsersync');

// Initialize tasks
sassTask(gulp);
scriptsTask(gulp);
imagesTask(gulp);
browserSyncTask(gulp);

// Define 'build' task
gulp.task('build', gulp.series('sass', 'scripts', 'images', 'jekyll-build'));