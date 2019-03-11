const gulp = require('gulp');
const sass = require('gulp-sass');
const ejs = require('gulp-ejs');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
sass.compiler = require('node-sass');

gulp.task('less', function(){
  return gulp.src('./less/style.scss')
  .pipe(sass())
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
  gulp.watch('./less/*.scss', gulp.series('less'));
  gulp.watch('./ejs/*.ejs', gulp.series('ejs'));
}));
