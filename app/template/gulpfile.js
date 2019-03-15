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

const datas =  new Array(30).fill({
  car: '快车',
  time: '01-06 18:27 周六',
  city: '广州市',
  start: '凤池农贸市场西侧',
  end: '微八连锁酒店(西朗地铁站店)',
  duration: '6.2',
  money: '24.59'
});
const pages = [];
pages.push(datas.slice(0,12));
let items = [];
datas.slice(12).forEach((item, index) => {
  if(index % 16 === 0){
    items = [];
    pages.push(items);
  }
  items.push(item);
})
console.log('==pages===',pages)
gulp.task('ejs', function() {
  return gulp.src('./ejs/index.ejs')
  .pipe(ejs({data: pages}, {}, { ext: '.html' }))
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
