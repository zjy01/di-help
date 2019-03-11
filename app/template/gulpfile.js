const gulp = require('gulp');
const less = require('gulp-less');
const ejs = require('gulp-ejs');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const reload = browserSync.reload;


gulp.task('less', function(){
  return gulp.src('./less/style.less')
  .pipe(less())
  .pipe(gulp.dest('./dist'))
  .pipe(reload({ stream:true }));
});

gulp.task('ejs', function() {
  return gulp.src('./ejs/index.ejs')
  .pipe(ejs({}, {}, { ext: '.html' }))
  .pipe(gulp.dest('./dist'))
  .pipe(reload({ stream:true }));
});
gulp.task('default',gulp.series('less', 'ejs', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./less/*.less', gulp.series('less'));
  gulp.watch('./ejs/*.ejs', gulp.series('ejs'));
}));
