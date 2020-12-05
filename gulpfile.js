const gulp = require('gulp');
const less = require('gulp-less');
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cleanCss = require('gulp-clean-css');

var autoprefixerOptions = {
}

gulp.task('less', function(cb) {
  gulp
    .src('*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(cleanCss({debug: true}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize} B -> ${details.stats.minifiedSize} B (ratio ${Math.round((100 * details.stats.minifiedSize) / details.stats.originalSize)} %)`);
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(
      gulp.dest(function(f) {
        return f.base;
      })
    );
  cb();
});

gulp.task(
  'default',
  gulp.series('less', function(cb) {
    gulp.watch('*.less', gulp.series('less'));
    cb();
  })
);