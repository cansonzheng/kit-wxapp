const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('concat', function() {
  gulp.src(['./src/class/*.js','./src/*.js'])
  .pipe(concat('kit-wxapp.js'))
  .pipe(gulp.dest(gulp.env.distPath||'./dist'));
});

gulp.task('default', function() {
  gulp.run(['concat']);
});
gulp.task('watch', function() {
  gulp.watch('./src/**/*.js',['concat']);
});
