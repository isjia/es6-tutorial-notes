var shell = require('shelljs');
var exec = require('gulp-exec');

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var browserSync = require('browser-sync').create();

gulp.task('build-gitbook', function(){
  if(shell.exec('npm run build').code != 0){
    echo('Error: generate gitbook failed');
    return exit(1);
  }
});

gulp.task('build', function(){
  return gulp.src('./notes/')
             .pipe(exec('gitbook build <%= file.path %>'));
})

gulp.task('copy-assets', function () {
     return gulp
             .src('notes/assets/*')
             .pipe(gulp.dest('notes/_book/assets/'));
});

gulp.task('deploy-to-gh-pages', function(){
  return gulp.src('./notes/_book/**/*')
    .pipe(ghPages());
});

// create a task that ensures the `html` task is complete before
// reloading browsers
gulp.task('html-watch', ['build', 'copy-assets'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('serve', ['build', 'copy-assets'], function(){
  browserSync.init({
    server: {
      baseDir: './notes/_book'
    }
  });
  gulp.watch(['notes/**/*.md'], ['html-watch']);
});

gulp.task('publish', ['build-gitbook', 'deploy-to-gh-pages']);
gulp.task('default', ['serve']);